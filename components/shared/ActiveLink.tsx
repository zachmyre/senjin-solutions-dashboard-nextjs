import Link from "next/link";
import { useRouter } from "next/router";

function ActiveLink({ children, href, className }: any) {
  const router = useRouter();
  const style: any = {
    marginRight: 10,
    color: router.asPath === href ? "rgb(165,161,127)" : "black",
  };

  return (
    <Link href={href}>
      <a className={className} style={style}>
        {children}
      </a>
    </Link>
  );
}

export default ActiveLink;
