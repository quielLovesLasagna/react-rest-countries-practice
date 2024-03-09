import { useEffect } from "react";

export function useFetchCountry(
	API,
	query,
	setIsLoading,
	setError,
	setCountries
) {
	useEffect(
		function () {
			const controller = new AbortController();

			async function getCountry() {
				try {
					if (!query) return;

					setIsLoading(true);
					setError("");

					const res = await fetch(`${API}name/${query}`, {
						signal: controller.signal,
					});

					if (!res.ok) {
						throw new Error(
							"Something when wrong with fetching countries or you may have entered a wrong query"
						);
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
		[query, API, setCountries, setError, setIsLoading]
	);
}
