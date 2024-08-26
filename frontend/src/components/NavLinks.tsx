"use client";
import clsx from "clsx";
import { MessageCircleMore, NotebookPen, Users, House } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";

const links = [
  { name: "概觀", href: "/overview", icon: House },
  { name: "成員", href: "/members", icon: Users },
  { name: "收支紀錄", href: "/records", icon: NotebookPen },
  { name: "留言板", href: "/comments", icon: MessageCircleMore },
];

type Props = {
  onNavChange: (isShow: boolean) => void;
};

export default function NavLinks({ onNavChange }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { bookId } = useParams();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const linkPath = `/${bookId}${link.href}`;
        return (
          <Link
            key={link.name}
            href={linkPath}
            className={clsx(
              `flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm  font-medium hover:bg-gray-200   hover:text-black md:flex-none md:justify-start md:p-2 md:px-3`,
              pathname === linkPath
                ? "bg-gray-200 text-black"
                : "bg-gray-50 text-slate-500"
            )}
            onClick={() => {
              router.push(link.href.toString());
              onNavChange(false);
            }}
          >
            <LinkIcon className="w-6 hidden md:block" />
            <p>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
