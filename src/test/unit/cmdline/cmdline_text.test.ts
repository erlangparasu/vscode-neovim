import { strict as assert } from "assert";

import { calculateInputAfterTextChange, commandInputIsCompletable } from "../../../cmdline/cmdline_text";

describe("calculateInputAfterTextChange", () => {
    [
        {
            name: "should return an empty string if the text is unchanged",
            oldText: "",
            newText: "",
            expected: "",
        },
        {
            name: "should return the newly typed character if a single character is added to the end",
            oldText: "%s/worl",
            newText: "%s/world",
            expected: "d",
        },
        {
            name: "should return <BS> if a single character is removed from the end",
            oldText: "%s/world",
            newText: "%s/worl",
            expected: "<BS>",
        },
        {
            name: "should force the line to be rewritten if some other change happens",
            oldText: "%s/hello",
            newText: ".s/hello",
            expected: "<C-u>.s/hello",
        },
    ].forEach(({ name, oldText, newText, expected }) => {
        it(name, () => {
            assert.equal(calculateInputAfterTextChange(oldText, newText), expected);
        });
    });
});

describe("commandInputIsCompletable", () => {
    [
        "substitute/blah",
        "substitute/",
        "s/blah",
        "s/",
        "g/blah",
        "global/",
        "v/",
        "v/blah",
        "vglobal/",
        "vglobal/blah",
    ].forEach((input) => {
        it(`should not produce completions for user-input commands: '${input}'`, () => {
            assert.equal(commandInputIsCompletable(input), false);
        });
    });

    ["p", "Ins", "nno"].forEach((input) => {
        it(`should produce completions for normal commands: '${input}'`, () => {
            assert.equal(commandInputIsCompletable(input), true);
        });
    });
});
