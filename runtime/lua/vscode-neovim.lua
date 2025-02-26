local api = require("vscode-neovim.api")

local default_optons = require("vscode-neovim.default-options")
local cursor = require("vscode-neovim.cursor")
local highlight = require("vscode-neovim.highlight")
local sync_options = require("vscode-neovim.sync-options")
local viewport = require("vscode-neovim.viewport")

default_optons.setup()
cursor.setup()
highlight.setup()
sync_options.setup()
viewport.setup()

local vscode = {
  -- actions
  action = api.action,
  call = api.call,
  eval = api.eval,
  eval_async = api.eval_async,
  -- hooks
  on = api.on,
  -- vscode settings
  has_config = api.has_config,
  get_config = api.get_config,
  update_config = api.update_config,
  -- notifications
  notify = api.notify,
  -- operatorfunc helper
  to_op = api.to_op,

  -- deprecated
  get_status_item = function()
    api.notify("Nvim statusline is now shown in vscode automatically. get_status_item was removed.")
    return {}
  end,
}

return vscode
