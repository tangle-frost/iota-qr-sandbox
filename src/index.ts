import * as IotaQR from "@tangle-frost/iota-qr-lib/pkg/iota-qr-lib.js";

async function generateQRCodePaymentData(): Promise<void> {
    document.getElementById("outputQR").classList.remove("alert", "alert-danger");
    document.getElementById("outputQR").innerHTML = "Generating...";

    try {
        const address = getElementValue("testAddress");
        const amount = getElementValue("testAmount");
        const tag = getElementValue("testTag");
        const message = getElementValue("testMessage");
        const renderType = getElementValue("testRenderType");
        const typeNumber = getElementValue("testTypeNumber");
        const cellSize = getElementValue("testCellSize");
        const marginSize = getElementValue("testMarginSize");
        const foreground = getElementValue("testForeground");
        const background = getElementValue("testBackground");

        const paymentData = IotaQR.TrinityPaymentQR.generatePaymentData(
            address,
            amount.length > 0 ? parseInt(amount, 10) : undefined,
            tag,
            message);

        const htmlElement = await IotaQR.TrinityPaymentQR.renderHtml(
            paymentData,
            renderType,
            parseInt(typeNumber, 10),
            parseFloat(cellSize),
            parseFloat(marginSize),
            {
                foreground: IotaQR.Color.fromHex(foreground),
                background: IotaQR.Color.fromHex(background),
                cssClass: "text-monospace"
            });

        document.getElementById("outputQR").innerHTML = "";
        document.getElementById("outputQR").appendChild(htmlElement);
    } catch (err) {
        document.getElementById("outputQR").classList.add("alert", "alert-danger");
        document.getElementById("outputQR").innerHTML = err.toString();
    }
}

async function generateQRCodeAddress(): Promise<void> {
    document.getElementById("outputQR2").classList.remove("alert", "alert-danger");
    document.getElementById("outputQR2").innerHTML = "Generating...";

    try {
        const address = getElementValue("testAddress2");
        const renderType = getElementValue("testRenderType2");
        const cellSize = getElementValue("testCellSize2");
        const marginSize = getElementValue("testMarginSize2");
        const foreground = getElementValue("testForeground2");
        const background = getElementValue("testBackground2");
        
        const htmlElement = await IotaQR.AddressQR.renderHtml(
            address,
            renderType,
            parseFloat(cellSize),
            parseFloat(marginSize),
            {
                foreground: IotaQR.Color.fromHex(foreground),
                background: IotaQR.Color.fromHex(background),
                cssClass: "text-monospace"
            });

        document.getElementById("outputQR2").innerHTML = "";
        document.getElementById("outputQR2").appendChild(htmlElement);
    } catch (err) {
        document.getElementById("outputQR2").classList.add("alert", "alert-danger");
        document.getElementById("outputQR2").innerHTML = err.toString();
    }
}

function getElementValue(id: string): string {
    return (<HTMLInputElement>document.getElementById(id)).value;
}

document.getElementById("btnPaymentData").onclick = () => generateQRCodePaymentData();
document.getElementById("btnAddress").onclick = () => generateQRCodeAddress();

