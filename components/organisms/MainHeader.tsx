import Link from "next/link";

const MainHeader = () => {
  return (
    <nav className="flex h-12 items-center border-b  bg-white px-5 text-black">
      <ul className="flex space-x-3">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/test">Test</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainHeader;
