local code = require("vscode-neovim")

vim.api.nvim_create_autocmd("InsertLeave", {
  group = vim.api.nvim_create_augroup("VSCodeCloseCompletionWidgets", { clear = true }),
  callback = function()
    code.action("hideSuggestWidget")
    code.action("closeParameterHints")
    code.action("editor.action.inlineSuggest.hide")
  end,
})
