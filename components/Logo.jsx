import Link from "next/link";
import { useRouter } from "next/router";
export default function Logo()
{
    const router = useRouter();
    const { pathname } = router;
    const inactiveLink = 'flex gap-2 p-2 rounded hover:bg-red-100 ';
    const activeLink = inactiveLink + '  text-black bg-red-300';
    return(
    
    
    <Link href={'/'} className={` ${pathname === '/' ? activeLink : inactiveLink}`}>
        
        <span className="flex gap-2 font-semibold justify-center  " >
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABIElEQVR4nO2YQU7DQAxF3y26aFlymh6LA8AtKlQBC8qSFeptigTtAYym8qBU7ZBJlBan+k/yIslM8n9saySDEEIIMTwzYAlsAQsSW+AJuO1i4jOAcCtE0jatMbL0Da+1Gy7EFFi5tseaDbmcIpnI3Li2LyrIKYyK1eobykipxod6bysy0vJDRp+RqzdiPXvIZOTMGSldjy4jXb9rMlKgrVlHkxG7NiMZGXGUkRIqLdTse9QjlzpH+j4PdyCGN/JfWK2+PJxLg7qo46BNzeKFL14FMzMD3lxb0niS9R81Gz0+mkYiDautY3w3jbz7zWfGw4trTtp/mTcc3gMT4jIBHhp6k/YD7gKUiXWMpPkkc0/VLoBIK8TONR5lQgghhKAnP39MSqrPZTAzAAAAAElFTkSuQmCC" alt="icon" className="w-6 h-6"/>
             Dashboard
          </span>
      </Link>
    )
}