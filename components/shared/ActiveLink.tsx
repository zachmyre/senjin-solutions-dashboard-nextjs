import { useRouter } from "next/router";

function ActiveLink({ children, href, className }: any) {
  const router = useRouter();
  const style: any = {
    marginRight: 10,
    color: router.asPath === href ? "rgb(165,161,127)" : "unset",
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  );
}

export default ActiveLink;
