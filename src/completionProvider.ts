"use strict";
import * as vscode from "vscode";
const typesEnum = vscode.CompletionItemKind;

export default class ScarpetCompletionItemProvider
  implements vscode.CompletionItemProvider {
  public async provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): Promise<vscode.CompletionItem[]> {
    const results: vscode.CompletionItem[] = [],
      text = document.lineAt(position.line).text;

    if (position.character <= 0 || this.isInsideStringOrComment(document, position)) {
      return Promise.resolve(results);
    }

    for (const item of ScarpetSet.set) {
      results.push(item);
    }
    return Promise.resolve(results);
  }

  private isInsideStringOrComment(
    document: vscode.TextDocument,
    position: vscode.Position
  ): boolean {
    const strings: Array<number[]> = [],
      text = document.lineAt(position.line).text;
    let curString: number | null = null;

    for (let i = 0; i < position.character; i++) {
      const char = text[i];

      //If its a comment, yeah just say it is
      if (char === "//" && !curString) {
        return true;
      }

      //Register each String in the line
      if (char === "'") {
        if (curString) {
          strings[curString].push(i);
          curString = null;
        } else {
          curString = strings.length;
          strings.push([i]);
        }
      }
    }
    return !!curString;
  }
}

export class ScarpetSet extends Set<vscode.CompletionItem> {
  static set = new ScarpetSet();

  constructor() {
    if (ScarpetSet.set) {
      throw Error(
        "This class is a singleton and is already constructed in static set property"
      );
    }
    super([
      //Operators
      new vscode.CompletionItem("~", typesEnum.Operator),
      new vscode.CompletionItem(":", typesEnum.Operator),
      new vscode.CompletionItem("+", typesEnum.Operator),
      new vscode.CompletionItem("-", typesEnum.Operator),
      new vscode.CompletionItem("!", typesEnum.Operator),
      new vscode.CompletionItem("^", typesEnum.Operator),
      new vscode.CompletionItem("*", typesEnum.Operator),
      new vscode.CompletionItem("/", typesEnum.Operator),
      new vscode.CompletionItem("%", typesEnum.Operator),
      new vscode.CompletionItem("==", typesEnum.Operator),
      new vscode.CompletionItem("!=", typesEnum.Operator),
      new vscode.CompletionItem(">", typesEnum.Operator),
      new vscode.CompletionItem(">=", typesEnum.Operator),
      new vscode.CompletionItem("<=", typesEnum.Operator),
      new vscode.CompletionItem("<", typesEnum.Operator),
      new vscode.CompletionItem("&&", typesEnum.Operator),
      new vscode.CompletionItem("||", typesEnum.Operator),
      new vscode.CompletionItem("=", typesEnum.Operator),
      new vscode.CompletionItem("+=", typesEnum.Operator),
      new vscode.CompletionItem("<>", typesEnum.Operator),
      new vscode.CompletionItem("->", typesEnum.Operator),
      new vscode.CompletionItem(";", typesEnum.Operator),
      new vscode.CompletionItem(",", typesEnum.Operator),
      new vscode.CompletionItem("$", typesEnum.Operator),
      //Functions
      //  arithmetic
      new vscode.CompletionItem("fact", typesEnum.Function),
      new vscode.CompletionItem("sqrt", typesEnum.Function),
      new vscode.CompletionItem("abs", typesEnum.Function),
      new vscode.CompletionItem("round", typesEnum.Function),
      new vscode.CompletionItem("floor", typesEnum.Function),
      new vscode.CompletionItem("ceil", typesEnum.Function),
      new vscode.CompletionItem("ln", typesEnum.Function),
      new vscode.CompletionItem("ln1p", typesEnum.Function),
      new vscode.CompletionItem("log10", typesEnum.Function),
      new vscode.CompletionItem("log", typesEnum.Function),
      new vscode.CompletionItem("log1p", typesEnum.Function),
      new vscode.CompletionItem("mandelbrot", typesEnum.Function),
      new vscode.CompletionItem("min", typesEnum.Function),
      new vscode.CompletionItem("max", typesEnum.Function),
      new vscode.CompletionItem("relu", typesEnum.Function),
      //  trigonometry/geometry
      new vscode.CompletionItem("sin", typesEnum.Function),
      new vscode.CompletionItem("cos", typesEnum.Function),
      new vscode.CompletionItem("tan", typesEnum.Function),
      new vscode.CompletionItem("asin", typesEnum.Function),
      new vscode.CompletionItem("acos", typesEnum.Function),
      new vscode.CompletionItem("atan", typesEnum.Function),
      new vscode.CompletionItem("atan2", typesEnum.Function),
      new vscode.CompletionItem("sinh", typesEnum.Function),
      new vscode.CompletionItem("cosh", typesEnum.Function),
      new vscode.CompletionItem("tanh", typesEnum.Function),
      new vscode.CompletionItem("sec", typesEnum.Function),
      new vscode.CompletionItem("csc", typesEnum.Function),
      new vscode.CompletionItem("sech", typesEnum.Function),
      new vscode.CompletionItem("csch", typesEnum.Function),
      new vscode.CompletionItem("cot", typesEnum.Function),
      new vscode.CompletionItem("acot", typesEnum.Function),
      new vscode.CompletionItem("coth", typesEnum.Function),
      new vscode.CompletionItem("asinh", typesEnum.Function),
      new vscode.CompletionItem("acosh", typesEnum.Function),
      new vscode.CompletionItem("atanh", typesEnum.Function),
      new vscode.CompletionItem("rad", typesEnum.Function),
      new vscode.CompletionItem("deg", typesEnum.Function),
      //  Type based
      new vscode.CompletionItem("copy", typesEnum.Function),
      new vscode.CompletionItem("type", typesEnum.Function),
      new vscode.CompletionItem("bool", typesEnum.Class),
      new vscode.CompletionItem("number", typesEnum.Class),
      new vscode.CompletionItem("str", typesEnum.Class),
      //  Threading/Parallel
      new vscode.CompletionItem("task", typesEnum.Function),
      new vscode.CompletionItem("task_thread", typesEnum.Function),
      new vscode.CompletionItem("sleep", typesEnum.Function),
      new vscode.CompletionItem("task_count", typesEnum.Function),
      new vscode.CompletionItem("task_value", typesEnum.Function),
      new vscode.CompletionItem("task_join", typesEnum.Function),
      new vscode.CompletionItem("task_completed", typesEnum.Function),
      new vscode.CompletionItem("synchronize", typesEnum.Function),
      new vscode.CompletionItem("task_dock", typesEnum.Function),
      //  Auxiliary
      new vscode.CompletionItem("lower", typesEnum.Function),
      new vscode.CompletionItem("upper", typesEnum.Function),
      new vscode.CompletionItem("title", typesEnum.Function),
      new vscode.CompletionItem("replace", typesEnum.Function),
      new vscode.CompletionItem("replace_first", typesEnum.Function),
      new vscode.CompletionItem("length", typesEnum.Function),
      new vscode.CompletionItem("rand", typesEnum.Function),
      new vscode.CompletionItem("perlin", typesEnum.Function),
      new vscode.CompletionItem("simplex", typesEnum.Function),
      new vscode.CompletionItem("print", typesEnum.Function),
      new vscode.CompletionItem("format",typesEnum.Function), //doesnt appear but is mentioned one time in docs
      new vscode.CompletionItem("time", typesEnum.Function),
      new vscode.CompletionItem("unix_time", typesEnum.Function),
      new vscode.CompletionItem("convert_date", typesEnum.Function),
      new vscode.CompletionItem("profile_expr", typesEnum.Function),
      //  Dynamic-based functions
      new vscode.CompletionItem("var", typesEnum.Function),
      new vscode.CompletionItem("undef", typesEnum.Function),
      new vscode.CompletionItem("vars", typesEnum.Function),
      //  Global key-value functions
      new vscode.CompletionItem("system_variable_get", typesEnum.Function),
      new vscode.CompletionItem("system_variable_set", typesEnum.Function),
      //  High-order functions
      new vscode.CompletionItem("map", typesEnum.Function),
      new vscode.CompletionItem("filter", typesEnum.Function),
      new vscode.CompletionItem("first", typesEnum.Function),
      new vscode.CompletionItem("all", typesEnum.Function),
      new vscode.CompletionItem("reduce", typesEnum.Function),
      //  Containers
      new vscode.CompletionItem("get", typesEnum.Function),
      new vscode.CompletionItem("has", typesEnum.Function),
      new vscode.CompletionItem("delete", typesEnum.Function),
      new vscode.CompletionItem("put", typesEnum.Function),
      new vscode.CompletionItem("l", typesEnum.Class),
      new vscode.CompletionItem("join", typesEnum.Function),
      new vscode.CompletionItem("split", typesEnum.Function),
      new vscode.CompletionItem("slice", typesEnum.Function),
      new vscode.CompletionItem("sort", typesEnum.Function),
      new vscode.CompletionItem("sort_key", typesEnum.Function),
      new vscode.CompletionItem("range", typesEnum.Function),
      new vscode.CompletionItem("element", typesEnum.Function),
      new vscode.CompletionItem("m", typesEnum.Class),
      new vscode.CompletionItem("keys", typesEnum.Function),
      new vscode.CompletionItem("values", typesEnum.Function),
      new vscode.CompletionItem("pairs", typesEnum.Function),
      //  Custoom events
      new vscode.CompletionItem("handle_event", typesEnum.Function),
      new vscode.CompletionItem("signal_event", typesEnum.Function),
      //  Minecraft
      new vscode.CompletionItem("block", typesEnum.Function),
      new vscode.CompletionItem("_x", typesEnum.Function),
      new vscode.CompletionItem("_y", typesEnum.Function),
      new vscode.CompletionItem("_z", typesEnum.Function),
      new vscode.CompletionItem("_", typesEnum.Function),
      new vscode.CompletionItem("_i", typesEnum.Function),
      new vscode.CompletionItem("_a", typesEnum.Function),

      //      World Manipulation
      new vscode.CompletionItem("set", typesEnum.Function),
      new vscode.CompletionItem("without_updates", typesEnum.Function),
      new vscode.CompletionItem("place_item", typesEnum.Function),
      new vscode.CompletionItem("set_poi", typesEnum.Function),
      new vscode.CompletionItem("set_biome", typesEnum.Function),
      new vscode.CompletionItem("update", typesEnum.Function),
      new vscode.CompletionItem("block_tick", typesEnum.Function),
      new vscode.CompletionItem("random_tick", typesEnum.Function),
      new vscode.CompletionItem("destroy", typesEnum.Function),
      new vscode.CompletionItem("harvest", typesEnum.Function),
      new vscode.CompletionItem("weather", typesEnum.Function),
      new vscode.CompletionItem("add_chunk_ticket", typesEnum.Function),
      new vscode.CompletionItem("chunk_tickets", typesEnum.Function),
      new vscode.CompletionItem("structure_eligibility", typesEnum.Function),
      //      Block and world querying
      new vscode.CompletionItem("pos", typesEnum.Function),
      new vscode.CompletionItem("pos_offset", typesEnum.Function),
      new vscode.CompletionItem("block_state", typesEnum.Function),
      new vscode.CompletionItem("block_list", typesEnum.Function),
      new vscode.CompletionItem("block_tags", typesEnum.Function),
      new vscode.CompletionItem("block_data", typesEnum.Function),
      new vscode.CompletionItem("poi", typesEnum.Function),
      new vscode.CompletionItem("biome", typesEnum.Function),
      new vscode.CompletionItem("solid", typesEnum.Function),
      new vscode.CompletionItem("air", typesEnum.Function),
      new vscode.CompletionItem("liquid", typesEnum.Function),
      new vscode.CompletionItem("flammable", typesEnum.Function),
      new vscode.CompletionItem("transparent", typesEnum.Function),
      new vscode.CompletionItem("opacity", typesEnum.Function),
      new vscode.CompletionItem("blocks_daylight", typesEnum.Function),
      new vscode.CompletionItem("emitted_light", typesEnum.Function),
      new vscode.CompletionItem("light", typesEnum.Function),
      new vscode.CompletionItem("block_light", typesEnum.Function),
      new vscode.CompletionItem("sky_light", typesEnum.Function),
      new vscode.CompletionItem("see_sky", typesEnum.Function),
      new vscode.CompletionItem("hardness", typesEnum.Function),
      new vscode.CompletionItem("blast_resistance", typesEnum.Function),
      new vscode.CompletionItem("in_slime_chunk", typesEnum.Function),
      new vscode.CompletionItem("top", typesEnum.Function),
      new vscode.CompletionItem("suffocates", typesEnum.Function),
      new vscode.CompletionItem("power", typesEnum.Function),
      new vscode.CompletionItem("ticks_randomly", typesEnum.Function),
      new vscode.CompletionItem("blocks_movement", typesEnum.Function),
      new vscode.CompletionItem("block_sound", typesEnum.Function),
      new vscode.CompletionItem("material", typesEnum.Function),
      new vscode.CompletionItem("map_colour", typesEnum.Function),
      new vscode.CompletionItem("loaded", typesEnum.Function),
      //new vscode.CompletionItem("loaded_ep", typesEnum.Function), deprecated
      new vscode.CompletionItem("loaded_status", typesEnum.Function),
      new vscode.CompletionItem("is_chunk_generated", typesEnum.Function),
      new vscode.CompletionItem("generation_status", typesEnum.Function),
      new vscode.CompletionItem("inhabited_time", typesEnum.Function),
      new vscode.CompletionItem("spawn_potential", typesEnum.Function),
      new vscode.CompletionItem("reload_chunk", typesEnum.Function),
      new vscode.CompletionItem("reset_chunk", typesEnum.Function),
      //      structure api
      new vscode.CompletionItem("structure_eligibility", typesEnum.Function),
      new vscode.CompletionItem("structures", typesEnum.Function),
      new vscode.CompletionItem("structure_references", typesEnum.Function),
      new vscode.CompletionItem("set_structure", typesEnum.Function),
      new vscode.CompletionItem("plop", typesEnum.Function),
      new vscode.CompletionItem("custom_dimension", typesEnum.Function),
      //      Big boi stuff
      new vscode.CompletionItem("scan", typesEnum.Function),
      new vscode.CompletionItem("volume", typesEnum.Function),
      new vscode.CompletionItem("neighbours", typesEnum.Function),
      new vscode.CompletionItem("rect", typesEnum.Function),
      new vscode.CompletionItem("diamond", typesEnum.Function),
      //      Entity API
      new vscode.CompletionItem("player", typesEnum.Class),
      new vscode.CompletionItem("entity_id", typesEnum.Function),
      new vscode.CompletionItem("entity_list", typesEnum.Function),
      new vscode.CompletionItem("entity_types", typesEnum.Function),
      new vscode.CompletionItem("entity_area", typesEnum.Function),
      new vscode.CompletionItem("entity_selector", typesEnum.Function),
      new vscode.CompletionItem("spawn", typesEnum.Function),
      new vscode.CompletionItem("query", typesEnum.Function),
      new vscode.CompletionItem("modify", typesEnum.Function),
      new vscode.CompletionItem("entity_load_handler", typesEnum.Function),
      new vscode.CompletionItem("entity_event", typesEnum.Function),
      //      Inventory and Items API
      new vscode.CompletionItem("stack_limit", typesEnum.Function),
      new vscode.CompletionItem("item_category", typesEnum.Function),
      new vscode.CompletionItem("recipe_data", typesEnum.Function),
      new vscode.CompletionItem("crafting_remaining_item", typesEnum.Function),
      new vscode.CompletionItem("inventory_size", typesEnum.Function),
      new vscode.CompletionItem("inventory_has_items", typesEnum.Function),
      new vscode.CompletionItem("inventory_get", typesEnum.Function),
      new vscode.CompletionItem("inventory_set", typesEnum.Function),
      new vscode.CompletionItem("inventory_find", typesEnum.Function),
      new vscode.CompletionItem("inventory_remove", typesEnum.Function),
      new vscode.CompletionItem("drop_item", typesEnum.Function),
      //      Events
      new vscode.CompletionItem("__command()->", typesEnum.Event),
      new vscode.CompletionItem("__config()->", typesEnum.Event),
      new vscode.CompletionItem("__on_server_starts()->", typesEnum.Event),
      new vscode.CompletionItem("__on_server_shuts_down()->", typesEnum.Event),
      new vscode.CompletionItem("__on_close()->", typesEnum.Event),
      new vscode.CompletionItem("__on_tick()->", typesEnum.Event),
      // new vscode.CompletionItem("__on_tick_nether()->", typesEnum.Event), deprecated
      // new vscode.CompletionItem("__on_tick_ender()->", typesEnum.Event), deprecated
      new vscode.CompletionItem("__on_chunk_generated(x, z)->", typesEnum.Event),
      new vscode.CompletionItem("__on_lightning(pos, mode)->", typesEnum.Event),
      new vscode.CompletionItem("__on_carpet_rule_changes(rule, new_value)->", typesEnum.Event),
      new vscode.CompletionItem(
        "__on_player_uses_item(player, item_tuple, hand)->",
        typesEnum.Event
      ),
      new vscode.CompletionItem(
        "__on_player_releases_item(player, item_tuple, hand)->",
        typesEnum.Event
      ),
      new vscode.CompletionItem(
        "__on_player_finishes_using_item(player, item_tuple, hand)->",
        typesEnum.Event
      ),
      new vscode.CompletionItem(
        "__on_player_clicks_block(player, block, face)",
        typesEnum.Event
      ),
      new vscode.CompletionItem(
        "__on_player_breaks_block(player, block)->",
        typesEnum.Event
      ),
      new vscode.CompletionItem(
        "__on_player_right_clicks_block(player, item_tuple, hand, block, face, hitvec)->",
        typesEnum.Event
      ),
      new vscode.CompletionItem(
        "__on_player_interacts_with_block(player, hand, block, face, hitvec)->",
        typesEnum.Event
      ),
      new vscode.CompletionItem(
        "__on_player_places_block(player, item_tuple, hand, block)->",
        typesEnum.Event
      ),
      new vscode.CompletionItem(
        "__on_player_interacts_with_entity(player, entity, hand)->",
        typesEnum.Event
      ),
      new vscode.CompletionItem(
        "__on_player_trades(player, entity, buy_left, buy_right, sell)->",
        typesEnum.Event
      ),
      new vscode.CompletionItem(
        "__on_player_collides_with_entity(player, entity)->",
        typesEnum.Event
      ),
      new vscode.CompletionItem(
        "__on_player_chooses_recipe(player, recipe, full_stack)->",
        typesEnum.Event
      ),
      new vscode.CompletionItem("__on_player_switches_slot(player, from, to)->", typesEnum.Event),
      new vscode.CompletionItem("__on_player_swaps_hands(player)->", typesEnum.Event),
      new vscode.CompletionItem("__on_player_swings_hands(player, hand)->", typesEnum.Event),
      new vscode.CompletionItem(
        "__on_player_attacks_entity(player, entity)->",
        typesEnum.Event
      ),
      new vscode.CompletionItem(
        "__on_player_takes_damage(player, amount, source, source_entity)->",
        typesEnum.Event
      ),
      new vscode.CompletionItem("__on_player_deals_damage(player, amount, entity)->",typesEnum.Event),
      new vscode.CompletionItem("__on_player_dies(player)->",typesEnum.Event),
      new vscode.CompletionItem("__on_player_respawns(player)->",typesEnum.Event),
      new vscode.CompletionItem(
        "__on_player_changes_dimension(player, from_pos, from_dimension, to_pos, to_dimension)->",
        typesEnum.Event
      ),
      new vscode.CompletionItem(
        "__on_player_rides(player, forward, strafe, jumping, sneaking)->",
        typesEnum.Event
      ),
      new vscode.CompletionItem("__on_player_jumps(player)->", typesEnum.Event),
      new vscode.CompletionItem(
        "__on_player_deploys_elytra(player)->",
        typesEnum.Event
      ),
      new vscode.CompletionItem(
        "__on_player_wakes_up(player)->",
        typesEnum.Event
      ),
      new vscode.CompletionItem(
        "__on_player_escapes_sleep(player)->",
        typesEnum.Event
      ),
      new vscode.CompletionItem(
        "__on_player_starts_sneaking(player)->",
        typesEnum.Event
      ),
      new vscode.CompletionItem(
        "__on_player_stops_sneaking(player)->",
        typesEnum.Event
      ),
      new vscode.CompletionItem(
        "__on_player_starts_sprinting(player)->",
        typesEnum.Event
      ),
      new vscode.CompletionItem(
        "__on_player_stops_sprinting(player)->",
        typesEnum.Event
      ),
      new vscode.CompletionItem(
        "__on_player_drops_item(player)->",
        typesEnum.Event
      ),
      new vscode.CompletionItem(
        "__on_player_drops_stack(player)->",
        typesEnum.Event
      ),
      new vscode.CompletionItem(
        "__on_player_picks_up_item(player, item)->",
        typesEnum.Event
      ),
      new vscode.CompletionItem("__on_player_connects(player)->", typesEnum.Event),
      new vscode.CompletionItem("__on_player_disconnects(player, reason)->", typesEnum.Event),
      new vscode.CompletionItem(
        "__on_statistic(player, category, event, value)->",
        typesEnum.Event
      ),
      //      Scoreboard API
      new vscode.CompletionItem("scoreboard", typesEnum.Function),
      new vscode.CompletionItem("scoreboard_add", typesEnum.Function),
      new vscode.CompletionItem("scoreboard_remove", typesEnum.Function),
      new vscode.CompletionItem("scoreboard_display", typesEnum.Function),
      //      Team API
      new vscode.CompletionItem("team_list", typesEnum.Function),
      new vscode.CompletionItem("team_add", typesEnum.Function),
      new vscode.CompletionItem("team_remove", typesEnum.Function),
      new vscode.CompletionItem("team_leave", typesEnum.Function),
      new vscode.CompletionItem("team_property", typesEnum.Function),

      //      Misc
      new vscode.CompletionItem("bossbar", typesEnum.Function),
      new vscode.CompletionItem("sound", typesEnum.Function),
      new vscode.CompletionItem("particle", typesEnum.Function),
      new vscode.CompletionItem("particle_line", typesEnum.Function),
      new vscode.CompletionItem("particle_box", typesEnum.Function),
      //new vscode.CompletionItem("particle_rect", typesEnum.Function), deprecated
      new vscode.CompletionItem("draw_shape", typesEnum.Function),
      new vscode.CompletionItem("create_marker", typesEnum.Function),
      new vscode.CompletionItem("remove_all_marker", typesEnum.Function),
      new vscode.CompletionItem("nbt", typesEnum.Function),
      new vscode.CompletionItem("escape_nbt", typesEnum.Function),
      new vscode.CompletionItem("tag_matches", typesEnum.Function),
      new vscode.CompletionItem("parse_nbt", typesEnum.Function),
      new vscode.CompletionItem("encode_nbt", typesEnum.Function),
      new vscode.CompletionItem("display_title", typesEnum.Function),
      new vscode.CompletionItem("logger", typesEnum.Function),
      new vscode.CompletionItem("read_file", typesEnum.Function),
      new vscode.CompletionItem("delete_file", typesEnum.Function),
      new vscode.CompletionItem("write_file", typesEnum.Function),
      new vscode.CompletionItem("list_files", typesEnum.Function),
      new vscode.CompletionItem("run", typesEnum.Function),
      new vscode.CompletionItem("save", typesEnum.Function),
      new vscode.CompletionItem("load_app_data", typesEnum.Function),
      new vscode.CompletionItem("store_app_data", typesEnum.Function),
      new vscode.CompletionItem("tick_time", typesEnum.Function),
      new vscode.CompletionItem("world_time", typesEnum.Function),
      new vscode.CompletionItem("day_time", typesEnum.Function),
      new vscode.CompletionItem("last_tick_times", typesEnum.Function),
      new vscode.CompletionItem("game_tick", typesEnum.Function),
      //new vscode.CompletionItem("seed", typesEnum.Function), deprecated
      new vscode.CompletionItem("current_dimension", typesEnum.Function),
      new vscode.CompletionItem("in_dimension", typesEnum.Function),
      new vscode.CompletionItem("view_distance", typesEnum.Function),
      new vscode.CompletionItem("get_mob_counts", typesEnum.Function),
      new vscode.CompletionItem("schedule", typesEnum.Function),
      new vscode.CompletionItem("statistic", typesEnum.Function),
      new vscode.CompletionItem("system_info", typesEnum.Function),
      new vscode.CompletionItem("nbt_storage", typesEnum.Function),
      //Keywords (Some global variables are going to be keywords)
      //  Global Variables
      new vscode.CompletionItem("null", typesEnum.Keyword),
      new vscode.CompletionItem("true", typesEnum.Keyword),
      new vscode.CompletionItem("false", typesEnum.Keyword),
      new vscode.CompletionItem("pi", typesEnum.Unit),
      new vscode.CompletionItem("euler", typesEnum.Unit),
      new vscode.CompletionItem("loop", typesEnum.Keyword),
      //  ????
      new vscode.CompletionItem("outer", typesEnum.Keyword),
      new vscode.CompletionItem("import", typesEnum.Keyword),
      new vscode.CompletionItem("call", typesEnum.Keyword),
      new vscode.CompletionItem("not", typesEnum.Function),
      //  Control Flow
      new vscode.CompletionItem("return", typesEnum.Keyword),
      new vscode.CompletionItem("exit", typesEnum.Keyword),
      new vscode.CompletionItem("try", typesEnum.Keyword),
      new vscode.CompletionItem("if", typesEnum.Keyword),
      new vscode.CompletionItem("throw", typesEnum.Keyword),
      //  Loops
      new vscode.CompletionItem("break", typesEnum.Keyword),
      new vscode.CompletionItem("continue", typesEnum.Keyword),
      new vscode.CompletionItem("for", typesEnum.Keyword),
      new vscode.CompletionItem("c_for", typesEnum.Keyword),
      new vscode.CompletionItem("while", typesEnum.Keyword),
      new vscode.CompletionItem("loop", typesEnum.Keyword)
    ]);
  }
}
