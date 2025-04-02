import { BLEPrinter, IBLEPrinter } from "react-native-thermal-receipt-printer";

export default function usePrint() {
    useEffect(() => {
        async function initPrinter() {
            await BLEPrinter.init();
            const printers = await BLEPrinter.getDeviceList();
            setPrintersList(printers);
            
            //printer
            await onLinkPrinterPress(printers[0]);
        }

        initPrinter();
    }, []);


    const onLinkPrinterPress = async (printer) => {
        setLinkedPrinter(printer);
        await BLEPrinter.connectPrinter(printer.inner_mac_address);
    };

    const onPrintPress = () => {
        try {
            BLEPrinter.printText("Receipt content");
        } catch ({ message }) {
            console.log("Error:", message);
        }
    };

    return {
        onLinkPrinterPress,
        onPrintPress
    }
}