import { useEffect, useState } from "react";
import Countries from "./Countries";
import Search from "./Search";
import Country from "./Country";
import Loader from "./Loader";

const API = "https://restcountries.com/v3.1/";

export default function App() {
	const [query, setQuery] = useState("");
	const [allCountries, setAllCountries] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(function () {
		async function getAllCountries() {
			try {
				setIsLoading(true);
				const res = await fetch(`${API}all`);
				const data = await res.json();
				setAllCountries(data);
			} catch (err) {
				console.log(err);
			} finally {
				setIsLoading(false);
			}
		}
		getAllCountries();
	}, []);

	return (
		<>
			<header className="header">
				<Search query={query} setQuery={setQuery} />
			</header>
			<main className="main">
				<section className="section">
					<Countries>
						{isLoading && !allCountries.length && <Loader />}
						{!isLoading &&
							allCountries.length &&
							allCountries.map((country) => (
								<Country country={country} key={country.name.common} />
							))}
					</Countries>
				</section>
			</main>
		</>
	);
}
