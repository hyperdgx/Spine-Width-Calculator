let type = 'paperback';

function selectType(selectedType) {
    type = selectedType;
    document.getElementById("paperback").classList.toggle('active', selectedType === 'paperback');
    document.getElementById("hardback").classList.toggle('active', selectedType === 'hardback');
}

function calculateSpine() {
    const pages = document.getElementById("pages").value;
    const paperType = document.getElementById("paperType").value;

    if (pages && paperType) {
        const [gsm, bulk] = paperType.split('-').map(Number);
        let spineWidth = (((pages / 2) * gsm * bulk) / 1000);
        spineWidth += type === 'paperback' ? 0.6 : 2;
        document.getElementById("result").innerText = `Spine Width: ${spineWidth.toFixed(2)} mm`;
        document.getElementById("result").dataset.spineWidth = spineWidth.toFixed(2);
    } else {
        document.getElementById("result").innerText = "Please fill all the fields.";
    }
}

function calculateJob() {
    const length = document.getElementById("length").value;
    const width = document.getElementById("width").value;
    const spineWidth = parseFloat(document.getElementById("result").dataset.spineWidth);

    if (length && width && spineWidth) {
        const lengthInMM = length * 25.4;
        const widthInMM = width * 25.4;
        let totalJobWidth = (widthInMM * 2) + spineWidth;
        let totalJobLength = lengthInMM;

        // Add +53 mm to width and +32 mm to length if Hardback is selected
        if (type === 'hardback') {
            totalJobWidth += 53;
            totalJobLength += 38;
        }

        document.getElementById("jobResult").innerHTML = `
            Length: ${lengthInMM.toFixed(2)} mm<br>
            Width: ${widthInMM.toFixed(2)} mm<br>
            Total Job Width: ${totalJobWidth.toFixed(2)} mm<br>
            Total Job Length: ${totalJobLength.toFixed(2)} mm
        `;
    } else {
        document.getElementById("jobResult").innerText = "Please fill all fields and calculate spine width first.";
    }
}

