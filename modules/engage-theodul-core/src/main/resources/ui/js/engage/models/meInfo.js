/**
 * Licensed to The Apereo Foundation under one or more contributor license
 * agreements. See the NOTICE file distributed with this work for additional
 * information regarding copyright ownership.
 *
 *
 * The Apereo Foundation licenses this file to you under the Educational
 * Community License, Version 2.0 (the "License"); you may not use this file
 * except in compliance with the License. You may obtain a copy of the License
 * at:
 *
 *   http://opensource.org/licenses/ecl2.txt
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
 * License for the specific language governing permissions and limitations under
 * the License.
 *
 */
/*jslint browser: true, nomen: true*/
/*global define, CustomEvent*/
define(['jquery', 'backbone', 'js-yaml.min'], function($, Backbone, jsyaml) {
    "use strict";

    var configURL = "/ui/config/theodul/config.yml",
        prop_shortcut = "player.shortcut.",
        prop_shortcut_sequence = "player.shortcut-sequence",
        prop_allowedtags = "player.allowedtags",
        prop_allowedformats = "player.allowedformats",
        prop_mastervideotype = "player.mastervideotype",
        prop_positioncontrols = "player.positioncontrols",
        prop_layout = "player.layout",
        prop_focusedflavor = "player.focusedflavor",
        prop_logo_player = "logo_player",
        prop_logo_mediamodule = "logo_mediamodule",
        prop_link_mediamodule = "link_mediamodule",
        prop_show_embed_link = "show_embed_links",
        prop_matomo_server = "player.matomo.server",
        prop_matomo_site_id = "player.matomo.site_id",
        prop_matomo_heartbeat = "player.matomo.heartbeat",
        prop_matomo_notification = "player.matomo.notification",
        prop_matomo_track_events = "player.matomo.track_events",
        prop_hide_video_context_menu = "player.hide_video_context_menu",
        ready = false,
        positioncontrols = "",
        config = "";
    /*
     * Model with information about the current user and the current MH configuration
     */
    var MeInfoModel = Backbone.Model.extend({
        urlRoot: "../../../info/me.json",
        initialize: function() {
            this.fetch({
                success: function(me) {
                    var shortcuts = new Array(),
                        shortcut_sequence = "",
                        allowedTags,
                        allowedFormats,
                        mastervideotype = "",
                        logo_mediamodule = "",
                        logo_player = "",
                        link_mediamodule = false,
                        show_embed_link = false,
                        hide_video_context_menu = false,
                        layout = "off",
                        focusedflavor = "presentation",
                        matomo_server,
                        matomo_site_id,
                        matomo_heartbeat,
                        matomo_notification,
                        matomo_track_events;

                      $.ajax({
                        url: configURL,
                        dataType: "text",
                        success: function(data) {
                          var rawfile = data;
                          }
                        }).then(function(rawfile){
                      config = jsyaml.load(rawfile);
                      me.set("allowedtags", config.allowedTags);
                      me.set("allowedformats", config.allowedFormats);
                      me.set("shortcuts", config.shortcuts);
                      me.set("mastervideotype", config.mastervideotype);
                      me.set("logo_mediamodule", config.logo_mediamodule);
                      me.set("logo_player", config.logo_player);
                      me.set("link_mediamodule", config.link_mediamodule);
                      me.set("show_embed_links", config.show_embed_link);
                      me.set("hide_video_context_menu", config.hide_video_context_menu);
                      me.set("shortcut-sequence", config.shortcut_sequence);
                      me.set("layout", config.layout);
                      me.set("focusedflavor", config.focusedflavor);
                      me.set("matomo.server", config.matomo_server);
                      me.set("matomo.site_id", config.matomo_site_id);
                      me.set("matomo.heartbeat", config.matomo_heartbeat);
                      me.set("matomo.notification", config.matomo_notification);
                      me.set("matomo.track_events", config.matomo_track_events);
                      ready = true;
                      })

                  }
              });
          },
      ready: function() {
        return ready;
        },
      getPositionControls: function() {
        positioncontrols = config.positioncontrols;
        return positioncontrols;
        }
      });
      

  return MeInfoModel;
});
