import Image from "next/image";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <main className="container mx-auto px-4 py-16 md:py-32">
        <div className="flex flex-col items-center text-center">
          <img
            src="https://media.licdn.com/dms/image/v2/D4D03AQHptRZEBrSfRA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718743349085?e=1741824000&v=beta&t=NMIZL7kBYIH6ylNbQaxkRzaceqocc4r1AB26B3LNSQE"
            alt="Huzaifah's profile picture"
            width={150}
            height={150}
            className="rounded-full border-4 border-blue-500 shadow-lg mb-8"
          />
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Hi, I'm <span className="text-blue-400">Huzaifah</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-300">
            Full Stack Engineer
          </h2>
          <p className="max-w-2xl text-lg md:text-xl mb-8 text-gray-400">
            Passionate about building robust and scalable web applications.
            Experienced in both frontend and backend technologies, always eager
            to learn and tackle new challenges.
          </p>
          <div className="flex space-x-4 mb-12">
            <a
              href="https://github.com/huzaifah-here/go-accelovate-task"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/huzaifah-here/"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:huzaifahkhan00@gmail.com"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </main>
      <footer className="absolute bottom-0 w-full py-4 text-center text-gray-500">
        <p>&copy; 2023 Huzaifah. All rights reserved.</p>
      </footer>
    </div>
  );
}
