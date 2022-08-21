//eval
function hp_d11(s){var o="",ar=new Array(),os="",ic=0;for(i=0;i<s.length;i++){c=s.charCodeAt(i);if(c<128)c=c^2;os+=String.fromCharCode(c);if(os.length>80){ar[ic++]=os;os=""}}o=ar.join("")+os;return o}

//eval
var numComments = numComments || 5, avatarSize = avatarSize || 60, characters = characters || 40, defaultAvatar = defaultAvatar || "https://id.gravatar.com/userimage/20253351/2cf196e46c868cd40fd64f5eb325f50e.png", moreLinktext = moreLinktext || " More &raquo;", showAvatar = typeof showAvatar === "undefined" ? true : showAvatar, showMorelink = typeof showMorelink === "undefined" ? false : showMorelink, roundAvatar = typeof roundAvatar === "undefined" ? true : roundAvatar, hideCredits = hideCredits || false, maxfeeds = maxfeeds || 50, adminBlog = adminBlog || 'dzul Aceh';

    function dzul_komentar(dzulAceh) {
        var commentsHtml;
        commentsHtml = "<ul class=\"dzul_komentar\">";
        ntotal=0;
        for (var i = 0; i < maxfeeds; i++) {
            var commentlink, authorName, authorAvatar, avatarClass;
            if (i == dzulAceh.feed.entry.length) {
                break;
            }
            if(ntotal>=numComments){
                break;
            }
            var entry = dzulAceh.feed.entry[i];
            for (var l = 0; l < entry.link.length; l++) {
                if (entry.link[l].rel == "alternate") {
                    commentlink = entry.link[l].href;
                }
            }
            for (var a = 0; a < entry.author.length; a++) {
                authorName = entry.author[a].name.$t;
                authorAvatar = entry.author[a].gd$image.src;
            }

            if (authorName!= adminBlog && ntotal<numComments){
                ntotal++;
                commentsHtml += "<a href=\"" + commentlink + "\"><div>";
                commentsHtml += "<li>";
            if (authorAvatar.indexOf("/s1600/") != -1) {
                authorAvatar = authorAvatar.replace("/s1600/", "/s" + avatarSize + "-c/");
            } else if (authorAvatar.indexOf("/s220/") != -1) {
                authorAvatar = authorAvatar.replace("/s220/", "/s" + avatarSize + "-c/");
            } else if (authorAvatar.indexOf("/s512-c/") != -1 &&
                authorAvatar.indexOf("http:") != 0) {
                authorAvatar = "http:" + authorAvatar.replace("/s512-c/", "/s" + avatarSize + "-c/");
            } else if (authorAvatar.indexOf("blogblog.com/img/blank.gif") != -1) {
                if (defaultAvatar.indexOf("gravatar.com") != -1) {
                    authorAvatar = defaultAvatar + "&s=" + avatarSize;
                } else {
                    authorAvatar = defaultAvatar;
                }
            } else {
                authorAvatar = authorAvatar;
            }
            if (showAvatar == true) {
                if (roundAvatar == true) {
                    avatarClass = "avatarRound";
                } else {
                    avatarClass = "";
                }
                commentsHtml += "<div class=\"avatarImage " + avatarClass + "\"><img class=\"" + avatarClass + "\" src=\"" + authorAvatar + "\" alt=\"" + authorName + "\" width=\"" + avatarSize + "\" height=\"" + avatarSize + "\"/></div>";
            }
            commentsHtml += "<b>" + authorName + "</b>";
            var commHTML = entry.content.$t;
            var commBody = commHTML.replace(/(<([^>]+)>)/gi, "");
            if (commBody != "" && commBody.length > characters) {
                commBody = commBody.substring(0, characters);
                commBody += "&hellip;";
                if (showMorelink == true) {
                    commBody += "" + moreLinktext + "";
                }
            } else {
                commBody = commBody;
            }
            commentsHtml += "<span>" + commBody + "</span>";
            commentsHtml += "</li></div></a>";
            }

        }

        commentsHtml += "</ul>";
        var hideCSS = "";
        if (hideCredits == true) {
            hideCSS = "display:none;";
        }
        commentsHtml += "<span style=\"font-size:8px;display:block;text-align:right;" + hideCSS + "\">dimodifikasi oleh <a href=\"http://www.dzulcyber.com\" target=\"_blank\">dzulcyber.com</a></span>";
        document.write(commentsHtml);
    }
