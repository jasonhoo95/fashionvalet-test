import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Home() {
	return (
		<div>
			<div className="text-center font-bold headerTag">FASHION VALET</div>
			<div class="grid grid-cols-2 gap-2">
				<a href="/dickies">
					<div className="card-container text-center category-container">Dickies</div>
				</a>
				<a href="/coords">
					<div className="card-container text-center category-container">Co-oords</div>
				</a>
			</div>
		</div>
	);
}
