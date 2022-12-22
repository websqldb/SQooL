const downloadBtn = document.querySelector(".cheatsheet-download");

const downlodePdf = (filename, filepath) => {
    const element = document.createElement("a");
    element.setAttribute(
        "href",
        "../../data/cheatsheetData/SQooL_CheatSheet.pdf"
    );
    element.setAttribute("download", "CheatSheet");
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};

downloadBtn.addEventListener("click", (e) => {
    downlodePdf();
});
