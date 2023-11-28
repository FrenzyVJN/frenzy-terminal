
"use client";
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import img from '../public/ascii.png';

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentDirectory, setCurrentDirectory] = useState("/home/frenzyvjn");
  const [fileSystem, setFileSystem] = useState<{ [key: string]: string[] }>({
    "": ["home"],
    "/": ["home"],
    "/home": ["frenzyvjn", "admin"],
    "/home/frenzyvjn": [ "Portfolio", "Testing"],
    "/home/frenzyvjn/Documents": ["Home.txt", "About.txt", "Projects.txt", "Contact.txt"],
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
      case "clear":
        setOutput("");
        setInput("");
        return;
      case "help":
        newOutput = "Available commands:\n- ls: List projects\n- pwd: Show current directory\n- cd <dir>: Change directory\n- cd ..: Move up one level\n- mkdir <dir>: Create directory\n- clear: Clear the terminal\n- help: Show available commands\n";
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
      <h1 className='text-green-500'>frenzyvjn@frenzyvjn-MacBook-Pro ~ %</h1>
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