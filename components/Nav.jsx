import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import Logo from "../components/Logo";
import { Linkedin, Shapes } from "lucide-react";
import { FaUserGraduate } from "react-icons/fa";

export default function Nav({ show }) {
    const inactiveLink = 'flex gap-2 p-2 rounded hover:bg-red-100 ';
    const activeLink = inactiveLink + '  text-black bg-red-300';
    const inactiveIcon = 'w-6 h-6 ';
    const activeIcon = inactiveIcon + ' text-primary';
    const router = useRouter();
    const { pathname } = router;
    async function logout() {
        await router.push('/');
        await signOut();
    }
    return (
        <aside className={(show ? 'left-0' : '-left-full') + " top-0 text-black p-4 fixed w-full bg-white h-full md:static md:w-auto transition-all  "}>
            <div className="mb-4 mr-4  top-14 ">
                <Logo />
            </div>
            <nav className="flex flex-col gap-2 bg-white w-[11rem] ">
                <Link href={'/courses'} className={` ${pathname === '/courses' ? activeLink : inactiveLink}`}>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADUUlEQVR4nO2ZWWgUQRCGv2iixgOJF5qg4AlKVDxBCBiPBy+QIAhiwANEffBCxAsR442ggk8aFd/UeICoIIISjQoSb8QoEvOgCRo0kBg0xmOloALFurM7O8xkSZwfGnanq2uqurv+qu6BEO0Dt4FIEq0eKAEGA0P0d32SOsqCcCTisX3S5nW870hWcQ5wzYy7qs+Cel+gigeacTmt8L5AFbf2uIQIHSFcEcKtFQ9hjBDGCGGMxEMYI4QxQhgj/1WMRBK0JqAC2AcMMM/l937ta0rlwarMw+nOGpyM8RFtd0khugC5wB7gqzGqAditfSLTpjAceAo8AYal2pgQIdoZegPHgC9As7LmFC+KRgGb9YbxLdCoN4UvgSvACqCv//aTBiwFah3ofLIbJZnAMqDcJc//Ai4D03xyYiRQavTfAcYCXYHj+kwm0RFyN3sI+GyUyO+TwHztFye768sK1YHvRv6FrpLIJYtMzTs/VFetroqsTgv6mL5/kA9cB34bgx4CS1wmLdla24D3Zrzs6QPAIJdOzAIqdazYcQLoFUMuT2UqY81Cs3Z+A04BE/CGDGAhcC9q210EpjqMyQbOG/lncYJ5jrkIL4olsB5YB2ThH8YDZ6JqKzGyQPs7AmvMJ4YGYAOQHkNXD6DY6Lml8dKq6AdsB6qNIfeBR+b/hTiX27KSVYattugkpAwZSgI1xoF3wGwH+UzgsIlbqdXGBGmgMMpzNeogMC6BfDfgnBon301iYRLwSmV+KpN1ImB0UIazeeU1sEvjxFJnC7JUTsr76FUrUuMjevhylfj8QpoyzRHgQ5RT1Uqli7Sc7wwsjkGhucBjQ79HPeYiX1coT51qyQtOba3KbzLsVqV5zTfM0HJAtkmdJrhSTXwys24xGtgK3AQ+ataWwF0NDI06Ohcr1foCMfJGgpn8o4YVOPC+m624yhyBhcnm4iMKNTFFdBV2ABM1OKUMmaez1mickpjYqRnaDXKiJuqsQyniCUKJp43yEj0HOKGn7u8KM0aY5hIw04Gp0CCvM8WolDO+otzUWiuTGCcGT9fM3FKvSXsDbARG6ITkx/jW3p8A8EDLbwlMr8jWLRZNv7ZJXbWcNoJ0YIFuzxrdSlIs7g3oJBkiBAHhLwryx2DrCE/uAAAAAElFTkSuQmCC"  alt="icon"  size={20} strokeWidth={1.75} className={pathname === '/' ? activeIcon : inactiveIcon}></img>
                    Courses
                </Link>

                <Link href={'/module'} className={` ${pathname === '/module' ? activeLink : inactiveLink}`} >
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADKElEQVR4nO2avWsUQRjGfwETwcihIlhp7tKmjEZBC/8BldxZWyhaRPDsBCsbQUQQSwsLP4hg6T9gMImKTRrxK41NCmM0qYwxHysD78gwzO7N7s7u3mkeGNideWeeefdm5n332YNt/F9oAh+Bd3LdczgCTAGRVd4AJ+gBNICnwJZMfAm4ImVJ6rbEpk4XYi9wC1iVya4B94A9hs1u4AbwM8GmUlywnvYTYCjBfkhszF/tDjBAxVg39sBNoM+jT5/YmvtnmIphb+i3wMkE+2PAS0e/yqEnchFYMO6fAyOG3YjU6fYF6dMVjgxYE9kFXAdWpG4DeCBlQ+pWxEbZYvSvbI+oAPc55onuB+7KyaTb16ROtZnQ7WqsUoPmUWDac403jHZ17YI9zrRwFIa6I9i1Pda4b7saq9CgqQNZXLAL5YgPVyb0O1KLScdT0hOpZXCkFtNeFy471VFzSo1XBok698di7JbFZhG47CBzTbRfbBel7UfM2GNWzJnN4ojuPN7BblQItP0nq4/tyLjYmJNTYyRhPE+8SdvxFDDvSNn1vZ3afwHOeaY0lOkIEtSuWvtKj2OfdmkDYFSmI3FpfYgTKKrCEQ0VBB9KyRsToiodCYkoryNqM7ZKFhGaBl9L5pDbkdmYfCgurhSRx81mdaRuDfStYBEhTrRoG3y6ePH55DohRYQ0osWqL58pImwCj4FDBYoI54sSLdZLFhEK44tKFhEK44tKFhEK44sCiQhpHQnOFzka9jlypt/AfeCAR39fR4LyRYFEhDyOBOHrNJG87aXxRf+aI7WAIkISCuNbziAi7AAmPESETnwTIUWL0ZQiwmngg1E/4yEi2HwzRn+Vtp8JJVqoFOCsJSJoCVPfq/T9haXZqneGrGhZGvKUxWen9vNp+LSI8D1BRFDlNTBIfgzKWFEBosXfNFtlmL+MgdX1nPWLNAOq+nMWnwqOt0N9a1RB6ZGICI2YNZv2rXHMWjLmnhw2+Er5+qtOkUvAV2MZPOuQyh+UlGNT+qjlew3YSRcgzZtlUKW9KLhU9Lbj24dL1e9KHE74C8dxehBN4L2UnvxTzTbIiD//R0Oi9U3UdQAAAABJRU5ErkJggg=="  alt="icon"  size={20} strokeWidth={1.75} className={pathname === '/module' ? activeIcon : inactiveIcon}></img>
                    Module
                </Link>

                <Link href={'/blogs'} className={` ${pathname === '/blogs' ? activeLink : inactiveLink}`}>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEAklEQVR4nO2aQYgURxSGP511V0QxoogGUVHJQQ9eZEN0vSjJTWEFPbkzIIIoKh5ERfaQHCSr4Coq3kTJJQFREBNBBJEZRkU8iYKu4iFxF1QMJBFkNbFCyxt4lN3T3dXdMzsz/UOx3e91var6+72/q6cXcuSooQqYDmkVfGA6rAUS4Iqk/RuFnAAiZkDVqpWwc7/A1QQ1Wc2izuNkQAUoxzj3C1yJOFkdJ27fODFjERAXuQbQJiJo2rBVOp2AchwC2h05AUTMgGqTa7XpGWCa1JJgLnAcuA/cBX4AZiQloFFIOt4C4A8fQh8BszqBgOvS3/u7GPgSuCa2ExOBgG7gKDAGjAJDYktjvM3S9xXwhbIvEvuziUDAkE96DqUw3nSV+oOWb6HYx6KMU4m6YXDEqMRbDfTJ8WgK4x1Rfd8DwyoLhsV+yWUckxEBa4C1KRGwBHgH/Cc3z6hSGBRCPgJfu4xjQi4syKBlOXYpgR9dJqZwWfqck/ONwFNrjJ+irqsa9aVBMKCu8Y7D0C0kjKYkguvk+r+AecreA/wivn/kaUDaIlgAnqhrRlQWxM2MKOPZ6AIeyPUHLN804HfxHY4zjolBwIBa+IgcFx0zI0iE62GXxH8qd1zje/E9B6ZmQUABeKwWXbImU/PVbN7dShPeru61xPdq3t4NvhXfpoD+iQkYUHe/S1otC36rkxlp4bTEveHj+1l8N+v0T0RAIWBhRUt5i8qm9aEebBH2wwrggzTvWKNPHnn/AiuzIqAYkNq6LJ6Jzy6VNESwtt8/ZdknA/fEd9Z1HBNCQNiCShYB2hZFC8II6Bf/n8Bsy7dd+eZkRUDRqn0bWgtKPrZiAgJ6hFjPv9vH/0J8+0LGcCag4LM4P5R8SAojLnRiwCHxPQyIcR74FZhSJ34iAooRFxGWBSWHic0H/hbftyRH4H7DBBDQ6Gbjgtiv+Pi8nd7BFEj5BHsCSb/NuTT7zvTKo20cWGb5vlNvfqnARHgMNRKTgDsyp2OWr0t+6/N8+2PGDdxvmAlGQE13XgIzLd9e9ci13wVSE8Fmokf9gLLD8nl7gDfi2+AQO3MCqgk0oJaaXymb94zfKiXh4YzYvV0hE5GASgoiuErOx0UEvePbQkTtXWC54/xaogTWK0J6ZfGaqJMJYrcEAf0yl6tyvkWywchvAfpLT1sSUFJ1flHN7RawNGHslvg6vMeye1vhnUoIG0JApQkElNUW16gs8D5xpYWWKIFv5PP2tpTuessRkCVyAmiACFYc47j2ixO3ISJYdozj2i9O3LwEyEWQ/ClAxiJoMhLPqCJZ7wtTQ0TQZCSeUUWy3lfmXAPINYBcBIlTG51WAqZD2mdohuo3q0X9X6QctDv+B+wUPSNSl+mYAAAAAElFTkSuQmCC"   alt="icon" size={20} strokeWidth={1.75} className={pathname === '/' ? activeIcon : inactiveIcon}></img>
                    Blogs
                </Link>

                <Link href={'/teachers'} className={` ${pathname === '/teachers' ? activeLink : inactiveLink}`}>

                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACl0lEQVR4nO2XO2gVQRSGv4ASJdEImoiolaC9jY9Gky4IPmJKBbEUtBOxEExSq4gB0SqVrUHRysbYGNTEQrGysPGBSK43UVDUkQP/wrAks3c3d292b/aHaWbOnTPfnfOYhUqVKq1auZKMZ+0C4mgDuQqkYHKr7kb6gDFgFljQmAFGgd4GnWRJWJfSLqhhoB7Y8DswVHSQYeCfjO4Dh4AujcPApNb+AidYObkQSJ93ExcDm1ySTQ3YQgFBxrybSNID2Y5QQJDXWrRwSlK/bGcCTvLs4i4EMq/F7gZANsi2XkSQegqQjV4FWwm5EMisFq06JWlAtq8oIMioFq3EJumhbK9SQJBehYpTiV1Kl2UzB2xOeYCdwAGF5nLkkhrikJqdU4ntV850K5yimzCbYykcd+mmo2Zr+XgmTxDUsWuB6jGXEqIDeKzffgOeC8j+jIPkCII69oiSeV7/4EvlRNpwOienXxVaaG+bu0POIM3SbuCHnPoPzdOau1cGkDUKI3M44c2vA95o/mxeIJ3AeR1gIaHT/gI+AlMq3fuVD5GuyO4D0OPN39T8W/lrOsh2772VddihrwGngN9KaKt2kQaU6La2NyNEEKTTg3inqmTvqZDWAtuAI8B1QcTBbnj2PZ6N3RZ5gFzwIDZl3LxD4WU38h54Cqz31ifkY1r5kwvItBbS9Ic0Oq79rYLtacJ+bimQ6AmfFE5x7QB2JdjYl+cX7W+FhDxBXMa6/Fm/s1C6BQzGwgl9cZrNk1hVKxSIW2T8BB4p78Y1V/O6eqFB9qmXvPAehtH4A5xc/tlbA+Jrq162d4HbgqSMIK2Qq0Aa/Gdci8fRpAOVBcTFe1PZcgR9XZrvT5QcZFH/ZQ4t1y4gUxnOXalSJUqq/788SlQgrXK3AAAAAElFTkSuQmCC"  alt="icon"  size={20} strokeWidth={1.75} className={pathname === '/' ? activeIcon : inactiveIcon} />
                    Teacher
                </Link>

                <Link href={'/institutions'} className={` ${pathname === '/institutions' ? activeLink : inactiveLink}`}>

                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC7UlEQVR4nO2bv2sUURDHPxGDBFSIhQRiioCmESFgl05QtIil2FlYiH+AYDorQazsROwFPRIIiSBY6WkRkFTp0mggSiDB/CBCCObJgzl4LHveXfbHvdv7fmCKe7tv3sw3MztLuAMhhBBCCCFEJRgAbgJzwC+zOVvz10QTzgIPgBXANbFV4DFwrpmTfuQy8BLYC4T6AcwAo2Yztta4vmd7/N6+5ARwG/gIHAXCfAHuACeb7LkOLCT2fAPuNdlTOc5bC35PVNMr4EoHfiaAZ8DvwM9PW/MVWzmumkh/Up5nwxn8nkl5bh4A76xae5pT1lpLQXJ/gXngRouJegGoAbtms8Cl/9w/YD7n7YzGeUsWg4+lZxgDngIbQSKbwHNgvI39XrytlAm81WZ7jttZm8HeDYvJxxYt16xSDoPAl4H7wFAHfmq2dyGYwou29rYDP0N29nIQz6HF6GONgtPAw5Rn0Btg6pg+d81PWG1jtrZ9TJ9TFtNBEOeKxe5zKB0/BV9YQo2A1oEnwEhG3zvmz7dyXgI2GLEY14O4ty0Xn1Oh+PewaeBD4j2sDtwFBnM6Z9b8LpqI3t7bmm/vPBi0mOtBHkeW27TlmjufgsP2gdfAZAHnTCQGQDhELhZw3qTlsh+c5XPNnYbzRxnf3dph1AbGjlmtIPFChi23Rp65U5jjyJCAGZGAsQvYL5Y74civun2mBFybf6mq3Jc7LvKEoxdwrcUzo91nSwz3+VxK51ZCxCThP05XI75vzXLpGq5FgL1yX9dwkQsjAQ0JiCowFRe5MGphQwKiCkzFRS6MWtiQgKgCU3GRC6MWNiQgqsBUXOTCqIUNCYgqMBUXuTBqYUMCogpMxUUujFrYkICoAlNxkQujFjYkIKrAVFzkwkTZwl+DAFxFzH99rzRcRa00ulr+BSABMyIBYxew2dAIr9d7+HPhQ6XVF7HrFfhc6FCp2tBohQTMiASMVcB+s9zop18puTJ/rSSEEEIIIYQQdMw/1JS9x6sTGjsAAAAASUVORK5CYII="   alt="icon" size={20} strokeWidth={1.75} className={` ${pathname === '/institutions' ? activeIcon : inactiveIcon}`}/>
                    Institutions
                </Link>

                <Link href={'/students'} className={` ${pathname === '/students' ? activeLink : inactiveLink}`}>

                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEmklEQVR4nO2Za4hVVRTHf43pmDmoOIqTPUwzsySo+WClVEZESUkQWRn0ISoTiyywB/ShIIWECXqAWVHRhyJ6EZpIHyKwsDIrMi1Jc/JBD8tMR0dr8saK/4bVnjN3zrn3nHuv5R823LvP2v+11j57r73WPnAU/x+MBJYCXWpL1XfE4BjgJuBnoBS13cBdQBMNjinAamf4OmCa2jrXv1qyDYchwEPAIRlqS+k+YICTsbdwG/C7ZP4EHgdaaBBcBWx1s70cOKmM/BjgJSe/A7iWOmJsZNBm4PIM42cAX0cTMI4aYiCwUMvHDDgIPAwMroBrsMYedEtyoXQUinOAtW4W3wcm58A7AVjleL8EzqMA2IZ8AvhLin4E5hSgZ464S9KVazC4Evhe5Ie1L1opDsPlQJi0ncA11RDG0eVb4FJqh+nAxigYnJj1ZLZ4v0cEh7Qhm6k9mqU7nE+/AbfKxrJok+dhFj4EzqL+mAi85+x6Fzi5L+FZ7i1YGJyfISeyqHMj0AG8DawHfgUOOOUH1LdeMh3a3ONT6miSTSHs75HN/4K9qn0S+Cgl+VTgyehUr7R9p6g4NYXe8bIxTE6vZbZSD7fq1E7CIOB24IvIkG4lgo8CNyhJnKC0fbjaSPVN15tYojHdEdfnwFzpSoJt+E7JvpMkYMo2SOAbRS0P8/wzp9A23tPAhWWUpsEgcSwTZ+A3XTHGyLaSbDWbE3GKI/oKGBWlE+HZggpTkv5wnLiDHq9jlGwKeV1fq6aXsSUtodaEZ0U4kWRD0NPqlnOnJrzfuB1IfnB5z+g6OjJaNoSU3/YZWRyZ4lKTDUqxY0eGAhdrOVjUWSHZTpW1fiN3q69TMss1ZoE4jCt2ZJzbt9uA09LOhnfEqr5TXXjd7J4tAj4FenIIvaEZ11px+xonRFKzhUodQetxSxkDLIq8KgNuBi4C2hXv21z4bVNfu2RMdrHGbirDvyXNnkgKhbEjhusj8mU6VfO83jGuWeL2ukw31ThyvPraXQUXWtEoRXvr3DwceUv/O7Qhh1E8hknXY9L9Zh6O/KT/9bglbJVuqxozYWCCIyGZDOGxlmiR7r3VOBIM/0T/e6XMNcDV0v1x1oGXOUeuUN8t7kC6gNphGrBdui1UZ4I/L+y34VjgDde/qeBL6KboXHlNNqTGAK3FQLDX3d3akpsH7NKzmRSHmdKxSzozX9YtTjhV7bT2uEf9licVhRXScXelBLtFYOXm+fptNbbHCGC/7pwmkT/OEHdXuaIprSN2a3JmH46gL0/27AXyx4vifqoakpdF8ozLd15JkLMs9A+1tDcgaWB1RuDNnCR6TNbHl9B6ytxpPS9HXyc/hMj4XB5kS9xGt9yqL4x190tWFFWLGeLaB5yQA98/1dkatf7K2Qdd8VPNjXmLO78eoA5o1h1USUutUoRlah9Lq7lWotp9tV+G3FvB+PtdzVH3r7yzFfvt28kdGcbdqTE94mgIzJVR4XwJJUAShrrz4rA+EzQUrnO52i/AI8DZqv2H6PciPQu5XMO8iRiT9E2lv6ufD4DTOQJwiQ62jQoGXbpoe1ZnxlH85/E3/9PRUB54hggAAAAASUVORK5CYII="   alt="icon" size={20} strokeWidth={1.75} className={` ${pathname === '/students' ? activeIcon : inactiveIcon}`}></img>
                    Students
                </Link>

                <Link href={'/payments'} className={` ${pathname === '/payments' ? activeLink : inactiveLink}`}>

                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEZElEQVR4nO2YWaiVVRTHf06Zem9qjlg9pJJj+iBiD5oDIRSFKSJimUSZoBaiSQRipoHmgziWVhZpEQqWFoqKpGahpnnPiwMO4YgpztdySk8s+W9ZfHznTufcznfg/GHDvXuvs7+99pr+a0MRRRRRRC2hIfA2sAu4rrETmAg8RIHgMSAFpDOMfUA7CsASQYmDwBCgVONl4JDW/ki6Zd5xSjTT3FNAL/1tc0GZCSQYu3VIs4ShL1AObHUywyRjMZNYlOuQ5kqGZ+RqXpFHJHONBKE1MAsoU2YKAT0daCWZrRkUKSchGK5bzZSdLgAvxSgyIkmuZUrc04F+APoDTTQGAGu1dgf4wAV7S+Ck1qym5N2dgiWmViD3nmTOA12BMcBpzZUpVecVs5wlAqwmLANWRWR/jHG5sqQUxFDwzJ2CEus0dzYiO1Dzd5Warc4kphAGtyrR//WB5sC5GEVKJWsZLXG4FlEk4GyMIiHVXiWBKNPhLDtVpsggx60Sh5k6nKVYj1Uxwf6TZGeQQLSSq6SVYjPhfclcBlqQUAxTJkorxQ5UzJTInYIl7joCmVgMBa5UQFEuF4ISOMrxoYK5XBltr2IiL+70MDAS+A44rNu8J+JnTdIK4JUsaEU/4FvgOHBRhNEIZc7QEViog6erMP6SQlWFcaztGfb6B3gL2CBr2lgJtK2OAoMUpCFgbfwKvAl0UiELrWlnEb5tTnZ2Jfs3Aj4Cbkn+nNJ2b+Bx4PcKLss4XHex5m+A+fr/AerrNlORW1mmm6sKxjnlFwB1YmQGA0dc1vpUFCYw5+/d9zcCLwBNpaDN/RujnF3Ic7bBaOCYWzitPF+TgHzDKfMz8Los10ZxEL6RUqvrs5xZJmS0V91aC8Vn+K3JzZXMV5oz0vmgCdovN2lAdhjl+nMbNyPd4nJnhWZKFmFtC/CE22uIqE3o4ycBjd16a9dx3m8vXwTqkjvYQafoNTHOHWzckPsGNzYaX8f93ito1n0y8g2T/Uzr6/mf6om1vx/rxo9EHiOCIvY8hOLijOb/1vNqNN5KnKveUBLKG+wwPYAvdKA9wJdOuR0qAVEY5flTMldCoCcBJTHWmRzj6ia32MW0sYQuuT7MLmWTNcC7SrMd3GNcHJrIIkucEjtVm6IY4DKrpdtpKhnUhiLpLMZNvbrUi1F2kbPCPilfq+giWrFU/n08koajwwL+qIpuz5j9+jsr3NYLZbal4b4Z+yizhJf02kIp8ImzQiqDotWCpb3XgFORYPwcaE/u8TxwwsXCjFxYwQrQZqfAAeA3R0Fuy42MB2WLR4Gv3beMcjydq3b1uiv/Y1xR6iiOc8cVpPniUzXBcLUAoQBOiQn6GmO5Nl5dwQE7icwFC5nic6pBNtsqXXsa0oEcw4hZtyrK9tDzTwjOq/Jto99xqCvKf8lV57EZaH9eYI3RJnfDdtB5ynYN1JCNjPQ865LyaB2HZ4FfKimAJ9WDFAR6qedPyTrn1aOP14NGEUVQAPgPg0KxYrKql1EAAAAASUVORK5CYII="  alt="icon" size={20} strokeWidth={1.75} className={` ${pathname === '/payments' ? activeIcon : inactiveIcon}`}></img>
                    Payments
                </Link>

                <Link href={'/classRecordings'} className={` ${pathname === '/classRecordings' ? activeLink : inactiveLink}`}>

                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEi0lEQVR4nO2aW6gWVRTHf6ejYV6ohzoqpp7qpdvDeShTycBDD5o9hEFF0dGnysqHwgikl0RBMzUV6iGCHhIlX+NEFzrYwV60h1Q0NAyPF4Iu2sXycnJkw39kMc58M/N9sz++mTN/2HzfzNprzVr/2bP22nsGatSoUaNGjRA3AhuAM0BQsXYaWK8YE7G+Axz13VyMiTitTvOpHh42IyERgVpVkRpf0CQBE4AXgUHgBHAe+BM4ALwHLKDCBPQAP2R49r4DFtLhCHISMBU4JJ2jwPPAbOAm4GZgDrAW+EV9rgDbNGJKTcBDwBfAv+p/UCMhCROB1cBF9R8CJlPSR6DfBOLavpTgLfqAU9LbA4yjZARMVJJzfT4CpjfhxB2GhDWUjIAXJN8PdLfgyCPAKHAJuJ0SEfCl5M8V4MxO2VpHiQj4XfJpCfL5mhK/SZAvMPJ+k0BLQ8BlyW+InJ8CbAf+T7BxP7BL02Aov1W/biYpDQH/SR7O473Am2aetwS4jP+aCqDw3AXzf4J+nc3SEHBGclfs7I2p9B5MqAJdafwhMMuc682yOOk0Ar6W/CnTd5dK3C71GQbOaR3wMTCgqjB6jdCGS6xpiJLdqA37JOAtyT9rYeEURGyszqGTtd0CvK7yfE+O+EjrcKcS4WgBBIzKVm8Onaz9/o4QktlOkOFCHyQYzwqr+35Onaz9rpiapXACJgGHTd88i5opRu+wbPkg4N4EvUIIcJhh6nm35M2KudI5JRt4ImBApbo3Ahw2qq9b32fFduk4XTwSECgBeiXgHiWxCyp60tCnZfRl6fokwAbvjQCHLWZI92XcB3A6eZF3GuzWY3AE+DbGTuqFsmI88Ll0LmqIz1VidG2ezoUbKIPSyYvhHMHbgKMonAD0pmVTBsc2Nhl8kfBCQFTXbZb8ofZ9izaLhpdH4Glgh9G1Ozwzzfkd6tvMKNgbKXLcHsIDMbLQ9yUm53hLgk8CP8cM9UGRMNPkB9uOA0tzEhD3SB1KkDmc9DkLdJn5PHRkJfCo2TGy7Tft/ryiOxee32pWkCEe050bARbH+DVOb6Dc/7MNfE6KoxACtpmdnBWRIO4Cdpsc8KkWUJa8FeZ9gnttZjFifBiJ8csO93cisqAdBCw1wbfymqvfkPCEOX8yhYD9+v3VvItoGwHjjYMv0Tpelq0TJjEuVuCuLYrxq8c8Rvsa+OyFgGclOxDz7DaDLhPMMyl9rV89keO2JcGdkrlkVhRelc1PUvo1CiRaJYYjyZKQZOc6NOpwXLK7KQ73yeYx2oOWCDgvmXs/WBQmyeY/lICAIMMU6cWpdl4rGMsEdMdk1Kq22O8SlnWAY+1qy+Pu/o8Sup2UqmJAMf4UHQUDZi+tlQ8f4oqdoRbu1FBBRVeIbrNfeG0U+Lz78woYrm6LzesoWGaKkaI/Wtos2+82oRtus7nfImFv+HK0cxplPUTScVXaEWJeJI4lAs6h73XcwSrGDlYp5q/cweM6uCTBbVQXLrY3zLdOi0LB2g4Yju1ub0fZWaJPYOJyQlXaXxr2dsO1Ro0aNWowVnEVc8tsn14VsN0AAAAASUVORK5CYII="  alt="icon" size={20} strokeWidth={1.75} className={` ${pathname === '/classRecordings' ? activeIcon : inactiveIcon}`}></img>
                    Class Recordings
                </Link>

                <Link href={'/store'} className={` ${pathname === '/store' ? activeLink : inactiveLink}`}>

                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADoklEQVR4nO2bSWsUQRiGH+NBs7ggouAhN3PRo6DRSYwHQXPwKsQkeIsmmrjHCGof44YQcAONJnH5ES6n4FHjkrig4EHQg0dB1OhISQ98tF3V1T2T7h6pD4oM3U91d72peuvrqhkwx1pgELgKXMtJOQWsIV6sArqBY0A7MN+m0mlgFijmsKjnOmHZ+B7ga6D+FNBoqrQzB420KTsiGr8d+KWp+9TUEx4L8AlwBhjOQTkLTItnexQhwMNAOy4B38Sx9rBKDUI19Xc5+Yp1ogGfDFwt8DOkHSOi/vGwigUBvDHcYB7QBXT4n9PiNovnU71BFxs07fDEcS+s4oAA7hpusEtwu1PkDlk+X5/g7sQRYFwAhw03uJ4Rd9uSGxWcEs1agBkBqO6miynBbUmRe235fM8F12orQIOY+38DSzQXXwj8ENzSlLigQS/WcHUBA1xkK0BBnFRK62K94N6myLUK7pWBaxac6tHYCjCgMY5g9AruXorcQcEpL9DFPsFNxBFgXGMcwbghuCMpchOCU2Lo4qbgDsQRYNrSYJ4Jri1FbkZjbCYDVMPaSoC6KjDAWY2x2RqgUYBNlgaoy7DmmisYjE1ngGGZolaA/ZYG2JcgE6sEN2AwNp0BjsUR4JalAY4myMQqwY0ZjE1ngP1xBHiRIMNKk3spuBbL66lhbSVAnTAOkwHWZsRFGVsYpwyz3laAZksDzIrbGGFsYddTPRpbAfoyMrYk3IQlF2aAWgHOi4NDlqlof0bcHgP3QHB74whwThw8abiBGlMXgIv+eEubU+uCCzRMi+8jJZ9ojCNAhzj4AVhBdcVW4IvlC1WoAPX+AmPpxGfgir8pkucyEljBLvrtWBlXABXbgO+Bi1Vb+Wixa2R8G2zzFySKVVbUWv9lYFlE4yMFUFHjG0pPDrp4VOn1e64uMUokwP8eTgBcD8ANAZwHYDTBGn+jMq4rHwWaNNds8s+nOUt0+W2JbYLdZczJ7zTXfJ9RjtCVRACvzJuGRVZJkleuAJOW396II8Bcf5NkspICeDrI0MAk5ysZpud3AuB6AG4I4DwAZ4JuFsBNg16SeVQXLg/AJUK4TBCXCuPeBUhmkpUM9zJEzt8Gi9W0IOJVSICs9h2H8iLAcAYiqPXJ1XkRIC/hBMD1ANwQQAzvmpBdoPtlesBgjss/beuOOY/aCFAtxcP/75ugTksBstr6Kqd0loaA+hC2w6KOBzcXdaHmW/Udw6x/X2xb/rbtD/RikdHsJs5JAAAAAElFTkSuQmCC"  alt="icon" size={200} strokeWidth={1.75} className={` ${pathname === '/store' ? activeIcon : inactiveIcon}`}></img>
                    Store
                </Link>

                <Link href={'/orders'} className={` ${pathname === '/orders' ? activeLink : inactiveLink}`}>

                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB5ElEQVR4nO2bP0sDQRDFf10qFSJqawT9AlooWkQ/hRo7EQsrC5UUdikE/2CpYiVirUY7NZ1/WrUR/SYRTxY2sBwYMWTuxss8GA5S5L19mdmdze2CwWAwGFrCALAArAMbKYXjLnktiaEHOAY+gUhJ1IEjoFt68L3Aq4IB/xQvQF7SgOsY4T2wD2ylFI77IabpUmrwUwHJF7CIHix5TQ19ExIkewHBCfpwGujbkSC4Cghm0Yd56TKoBQRF9KEY6HNa246aGYBlQGQlQNM5YEa49Z3WPAcUEmiP656now0Y1GoA/vOKUNtb+WX5VWFAmjADsAzASoAU54AccBfblrYz3Pfeeh6Vc8CY8BLYiFGtBuT8LySZATeaMyBtmAFYBmAlwD/aDq8BI1kqgUILu8GPNuozA/hn2+FNYDhrBqQJMwDLAKwEsDkAmwSxVQBbBhFAzfoArBGKrBMk0VbYvQdcafI+MPOd4Lvnc8+ONuCtUw0YAlb9syMN+AvMAIQzoBoQzKEPpUDfhQTBbkDgjqVqw1mgb1uCYDL2ns4dUNaC5di/zeNSRNUY0aM/mJzWjRGXlU8xTecIIu8vJURK41n6wgT+WsqhP7IWKQmn5QDoIkH0+yPq5RRvjJS9hr4kB24wGAxkBd9DBMQyRd8JVwAAAABJRU5ErkJggg==" alt="icon"  size={20} strokeWidth={1.75} className={` ${pathname === '/orders' ? activeIcon : inactiveIcon}`}></img>
                    Orders
                </Link>


                <span className="flex gap-2 p-2 rounded hover:bg-red-100 cursor-pointer" onClick={logout}>

                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAg0lEQVR4nO2Wyw2AIBAFR0ugM2IlFmKsy5L0ssYErx5cwkNkEo7AJPuFTqVYpvN9gbd0AashBIdSYAeiUiB6Ps8SQyAAs0pgBLb0xqoQuJhSIt4SA4UFXBL2IOBpzUsTAp4QSJPwf2UYlI0oOu62MYxMPY6thoXEmhAw9VpuKoEOpTgBWrm2y79fsd4AAAAASUVORK5CYII=" alt="icon"  size={20} strokeWidth={1.75} className={` ${pathname === '/logout' ? activeIcon : inactiveIcon}`}></img>
                    Logout
                </span>

                
            </nav>
        </aside>

    )
}