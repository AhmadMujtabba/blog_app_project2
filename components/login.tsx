"use client";
import React, { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState<string | null>("");
  const [password, setPassword] = useState<string | null>("");

  const auth = useContext(AuthContext);

  const router = useRouter();

  if (!auth) return null;

  const { setUser } = auth;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userRawData = localStorage.getItem("blog-user") || "[]";
    const userData = JSON.parse(userRawData);
    const foundUser = userData.find(
      (user: { email: string; password: string }) =>
        user.email == email && user.password == password
    );
    if (foundUser) {
      setUser({
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
      });
      router.push("/posts");
    } else {
      alert("Authentication Failed !");
    }
  };

  return (
    <div className="main">
      <div className="form-box">
        <div className="form-heading">
          <p>Login</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <br></br>
            <input
              type="email"
              name="email"
              id="email"
              className="input"
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
          </div>
          <br></br>
          <div>
            <label htmlFor="password">Password</label>
            <br></br>
            <input
              type="password"
              name="password"
              id="password"
              className="input"
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
          </div>
          <br></br>
          <div className="btn-div">
            <button className="form-btn" type="submit">
              Login
            </button>
          </div>
        </form>
        <br />
        <hr></hr>
        <div className="form-bottom">
          <p>Don't have an account?</p>
          <Link href="/signup" className="form-anchor">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
