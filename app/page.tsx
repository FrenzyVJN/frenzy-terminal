
"use client";
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import img from '../public/ascii.png';

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [password, setPassword] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentDirectory, setCurrentDirectory] = useState("/home/frenzyvjn");
  const [fileSystem, setFileSystem] = useState<{ [key: string]: string[] }>({
    "": ["home"],
    "/": ["home"],
    "/home": ["frenzyvjn", "admin"],
    "/home/frenzyvjn": [ "Portfolio", "Admin"],
    "/home/frenzyvjn/Portfolio": ["Home.txt", "About.txt", "Projects.txt", "Contact.txt"],
    // Add more directories and files as needed
  });


  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = () => {
    let newOutput = "";

    switch (input.trim()) {
      case "ls":
        const contents = fileSystem[currentDirectory] || [];
        newOutput = contents.map((item: any) => `- ${item}`).join("\n") + "\n";
        break;
      case "pwd":
        newOutput = `${currentDirectory}\n`;
        break;
      case "cd":
        newOutput = "";
        break;
      case "cd ..":
        // Implement logic to move up one level in the directory structure
        setCurrentDirectory((prevDirectory) => {
          const currentPathSegments = prevDirectory.split('/');
          const newPathSegments = currentPathSegments.slice(0, -1);
          return newPathSegments.join('/');
        });
        newOutput = "";
        break;
      case "cd Admin":
          if (currentDirectory === "/home/frenzyvjn") {
            // Request password from the user
            const userPassword = prompt("Enter the admin password:");
            const password = "admin"
            // Verify the password
            if (userPassword === password) {
              setCurrentDirectory((prevDirectory) => `${prevDirectory}/Admin`);
            } else {
              newOutput = "Access denied. Incorrect password.\n";
            }
          } else {
            console.log("Access denied");
          }
          break;
  

      case "clear":
        setOutput("");
        setInput("");
        return;
      case "help":
        newOutput = "Available commands:\n- ls: List projects\n- pwd: Show current directory\n- cd <dir>: Change directory\n- cd ..: Move up one level\n- mkdir <dir>: Create directory\n- clear: Clear the terminal\n- help: Show available commands\n";
        break;
      case "cd Home.txt":
      case "cd About.txt":
      case "cd Contact.txt":
        if(currentDirectory === "/home/frenzyvjn/Portfolio") {
         newOutput = "Not a directory\n";
         break;
        }
      case "cd Projects.txt":
      case "cd Projects":
        if(currentDirectory === "/home/frenzyvjn/Portfolio") {
          window.open("https://www.frenzyvjn.tech/projects", "_blank");
          newOutput = "Opening link in a new tab...\n";
           }
      case "cat Home.txt":
      case "cat About.txt":
      case "cat Projects.txt":
      case "cat Contact.txt":
            if (currentDirectory === "/home/frenzyvjn/Portfolio") {
              // Only execute these commands if the current directory is /home/frenzyvjn/Portfolio
              switch (input.trim()) {
                case "cat Home.txt":
                  newOutput = "Hello! Welcome to my portfolio!\n";
                  break;
                case "cat About.txt":
                  newOutput = "👋 Greetings! I'm FrenzyVJN, a tech-savvy fresher on a journey through Computer Science Engineering. I'm a Cybersecurity Enthusiast.\n💡 My quest for knowledge takes me to CTFs, conferences, and meetups, where I connect with like-minded individuals and stay on the cutting edge.\n👨‍💻 Fluent in Python, Javascript, React, R, SQL and C, I'm a versatile developer. I've crafted projects that reflect my expertise in Cybersecurity, Ethical Hacking, and Full-Stack Development.\n🎓 A College Student deeply involved in Cybersecurity and Full-Stack Development, I excel in Python and JS. Proficient in Flask and React, I also navigate the realms of C and R, providing diverse solutions to varied projects.\n🌐 Additionally, I have a keen interest in computer vision and have successfully completed projects using OpenCV.";
                  break;
                case "cat Projects.txt":
                  newOutput = "I have built a few projects. Check them out!\n";
                  break;
                case "cat Contact.txt":
                  newOutput = "You can reach me at...\n";
                  break;
                default:
                  newOutput = "Invalid 'cat' command.\n";
                  break;
              }
            } else {
              newOutput = "File not found. 'cat' command is only available in /home/frenzyvjn/Portfolio.\n";
            }
            break;
      
      default:
        if (input.startsWith("cd ")) {
          const targetDirectory = input.substring(3).trim();
          // Check if the target directory exists in the current directory
          if (fileSystem[currentDirectory]?.includes(targetDirectory)) {
            setCurrentDirectory((prevDirectory) => `${prevDirectory}/${targetDirectory}`);
          } else {
            newOutput = `Directory '${targetDirectory}' not found\n`;
          }
        } else if (input.startsWith("mkdir ")) {
          const newDirectory = input.substring(6).trim();
          // Implement logic to create directory
          newOutput = `Created directory: ${currentDirectory}/${newDirectory}\n`;
        } else {
          newOutput = "Command not found. Type 'help' for available commands.\n";
        }
        break;
    }

    setOutput((prevOutput) => prevOutput + `frenzyvjn@frenzyvjn-MacBook-Pro ${currentDirectory} $ ${input}\n${newOutput}`);
    setInput("");
  };

  return (
    <main className='min-h-screen bg-black' ref={inputRef}>
      <Image className='flex mx-auto' src={img} alt='ascii' width={600}/>
      <h1 className='text-green-500 selection:bg-green-400 selection:bg-opacity-25'>frenzyvjn@frenzyvjn-MacBook-Pro ~ %</h1>
      <div className=''>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCommand();
            }
          }}
          className='text-green-500 bg-black border-none focus:outline-none'
        />
        <h1 className='text-green-500 terminal selection:bg-green-400 selection:bg-opacity-25'>
          {output}
        </h1>
      </div>
    </main>
  );
}