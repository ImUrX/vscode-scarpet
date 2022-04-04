import * as vscode from "vscode";

export class ScarpetColorProvider implements vscode.DocumentColorProvider {
    static literals: Map<number, string> = new Map([
        [0xFFFFFF, "w"],
        [0xFFFF55, "y"],
        [0xFF55FF, "m"],
        [0xFF5555, "r"],
        [0x55FFFF, "c"],
        [0x55FF55, "l"],
        [0x5555FF, "t"],
        [0x555555, "f"],
        [0xAAAAAA, "g"],
        [0xFFAA00, "d"],
        [0xAA00AA, "p"],
        [0xAA0000, "n"],
        [0x00AAAA, "q"],
        [0x00AA00, "e"],
        [0x0000AA, "v"],
        [0x000000, "k"]
    ]);

    provideDocumentColors(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.ProviderResult<vscode.ColorInformation[]> {
        const results = [];
        for(let i = 0; document.lineCount > i; i++) {
            const line = document.lineAt(i);
            if(line.isEmptyOrWhitespace || !/format\((.*)\)/.test(line.text)) {
                continue;
            }
            for(const match of line.text.matchAll(/format\((.*)\)/g)) {
                const args = match[1].split(",").map(x => x.trim()).filter(x => /^'.*'$/.test(x));
                for(const arg of args) {
                    const formats = arg.match(/(?:'\^?([wymrcltfgdpnqevk]|#[A-F0-9]{6})([ibsuo]{0,5}) [^']+')+/) || [];
                    
                }
            }
            
        }
        return [];
    }

    provideColorPresentations(color: vscode.Color, context: { readonly document: vscode.TextDocument; readonly range: vscode.Range; }, token: vscode.CancellationToken): vscode.ProviderResult<vscode.ColorPresentation[]> {
        if(color.alpha < 255) {
            return null;
        }
        const results = [];
        const hex = this.parseToHex(color);
        results.push(new vscode.ColorPresentation("#" + hex.toString(16)));
        if(ScarpetColorProvider.literals.has(hex)) {
            results.push(new vscode.ColorPresentation(ScarpetColorProvider.literals.get(hex)!));
        }
        return results;
    }

    private parseToHex(color: vscode.Color): number {
        return (((color.red << 8) + color.green) << 8) + color.blue;
    }
}