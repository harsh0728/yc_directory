import Navbar from "../../components/Navbar";
import "../globals.css";

export default function Layout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <div>
     <Navbar />
      <main>{children}</main>
    </div>
  );
}
