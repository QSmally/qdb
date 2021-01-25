
const C = {
    DIM:   "\x1b[40m",
    BOLD:  "\x1b[1m",
    RESET: "\x1b[0m"
};

module.exports = {
    DIM: Text => `${C.DIM}${Text}${C.RESET}`,
    BOLD: Text => `${C.BOLD}${Text}${C.RESET}`,
    LIST: (Items, Padding, Dashes) => Object.keys(Items)
        .map(Item => `${Dashes ? " -" : " "} ${Item}:`.padEnd(Padding) + Items[Item])
        .join("\n")
};
