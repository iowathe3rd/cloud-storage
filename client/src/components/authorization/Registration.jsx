import React, { useState } from "react";
import { registration } from "../../action/user";
import Input from "../../utils/input/Input";

function Registration() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(`${email}, ${password}`);
	};
	return (
		<div className="hero min-h-screen bg-base-200 bg-authBg">
			<div className="hero-content flex-col lg:flex-row-reverse">
				<div className="text-center lg:text-left">
					<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
						Зарегестрироваться!
					</h1>
					<p className="py-6">
						Пользуйтесь облачным хранилищем с любой точки земли!
					</p>
				</div>
				<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
					<div className="card-body">
						<form action="" onSubmit={handleSubmit}>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Email</span>
								</label>
								<Input
									name="emailInput"
									type="text"
									placeholder="Почта"
									className="input input-bordered"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Password</span>
								</label>
								<Input
									name="passInput"
									type="password"
									placeholder="password"
									className="input input-bordered"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<label className="label">
									<a href="#" className="label-text-alt link link-hover">
										Forgot password?
									</a>
								</label>
							</div>
							<div className="form-control mt-6">
								<button
									className={
										"btn " +
										(password && email ? "btn-primary" : "btn-disabled")
									}
									onClick={() => {
										registration(email, password);
									}}
								>
									Зарегестрироваться
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Registration;
