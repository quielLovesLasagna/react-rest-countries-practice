import { useEffect, useState } from "react";
import Countries from "./Countries";
import Search from "./Search";
import Country from "./Country";
import Loader from "./Loader";
import Error from "./Error";
import Button from "./Button";

const API = "https://restcountries.com/v3.1/";

export default function App() {
	const [query, setQuery] = useState("");
	const [countries, setCountries] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(function () {
		async function getAllCountries() {
			try {
				setIsLoading(true);
				setError("");

				const res = await fetch(`${API}all`);

				if (!res.ok) {
					throw new Error("Something when wrong with fetching countries");
				}

				const data = await res.json();

				if (data.response === "False") {
					throw new Error("Country not found");
				}

				setCountries(data);
			} catch (err) {
				console.log(err.message);
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		}
		getAllCountries();
	}, []);

	useEffect(
		function () {
			const controller = new AbortController();

			async function getCountry() {
				try {
					setIsLoading(true);
					setError("");

					const res = await fetch(`${API}name/${query}`, {
						signal: controller.signal,
					});

					if (!res.ok) {
						throw new Error("Something when wrong with fetching countries");
					}

					const data = await res.json();

					if (data.response === "False") {
						throw new Error("Country not found");
					}

					setCountries(data);
				} catch (err) {
					if (err.name !== "AbortError") {
						console.log(err.message);
						setError(err.message);
					}
				} finally {
					setIsLoading(false);
				}
			}
			getCountry();

			return function () {
				controller.abort();
			};
		},
		[query]
	);

	// ! -- Sort the countries alphabetically
	function handleSort() {
		setCountries((countries) =>
			[...countries].sort((a, b) =>
				a.name.common.toLowerCase().localeCompare(b.name.common.toLowerCase())
			)
		);
	}

	// ! -- Show alert box when user views a country
	function handleViewDetails() {
		alert("Nothing to see here yet...");
	}

	return (
		<>
			<header className="header">
				<Search query={query} setQuery={setQuery} />
				{countries.length > 1 && (
					<Button className={"sort__btn"} onClick={handleSort}>
						Sort A-Z
					</Button>
				)}
			</header>
			<main className="main">
				<section className="section">
					<Countries>
						{isLoading && <Loader />}
						{error && <Error message={error} />}
						{!isLoading &&
							!error &&
							countries.map((country) => (
								<Country
									country={country}
									key={country.name.common}
									onViewDetails={handleViewDetails}
								/>
							))}
					</Countries>
				</section>
			</main>
		</>
	);
}
