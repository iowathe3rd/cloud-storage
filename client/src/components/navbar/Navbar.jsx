import React from "react";
import Logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";

function Navbar() {
	return (
		<div className="navbar bg-base-100 container m-auto">
			<div className="flex-1 text-xl gap-4">
				<a href="/">
					<img src={Logo} alt="" className="h-10" />
				</a>
				Cloud storage
			</div>
			<div className="flex-none">
				<div className="flex items-center gap-3">
					<div className="btn btn-ghost">
						<NavLink to="/authorization">Войти</NavLink>
					</div>
					<div className="btn btn-ghost">
						<NavLink to="/registration">Регистрация</NavLink>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
