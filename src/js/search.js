async function searchData(input) {
	const response = await fetch("../../data/student.json");

	const data = await response.json();

	console.log(input.toLowerCase());
	const result = await data.filter(
		(_) =>
			_.이름.toLowerCase().indexOf(input.toLowerCase()) + 1 ||
			_.주소.toLowerCase().indexOf(input.toLowerCase()) + 1,
	);

	console.log("result", result);

	if (result.length === 0) searchResult("찾는 결과가 없습니다.");
	else
		result.forEach((_) => {
			searchResult(_.이름, _.주소);
		});
}

function searchViewer() {
	const typingWord = document.querySelector("#iptSearch").value;

	if (!typingWord) return;

	const main = document.querySelector("main");
	main.innerText = "";

	searchData(typingWord);
}

function searchResult(제목, 내용) {
	const main = document.querySelector("main");

	const content = `<a>
      <h3>${제목}</h3>
      <p>${내용 || ""}</p>
    </a>`;

	main.innerHTML += content;
}

const button = document.querySelector(".btn-search");

button.addEventListener("click", searchViewer);

// 2. 엔터치면 결과 화면 나오게 하기
const input = document.querySelector("#iptSearch");
input.addEventListener("keyup", function (event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		button.click();
	}
});
