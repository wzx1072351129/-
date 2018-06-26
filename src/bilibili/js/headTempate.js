<!--     <script id="test" type="text/html">
        <% for(var i=0;i<data.length;i++) { %>
        <% var record = data[i].record %>

        <ul class="list history">
            <div>
                <li class="timeline">
                    <span class="date"><%= data[i].date %></span>
                </li>

                <% for(var j=0;j<record.length;j++){ %>
                <li title="<%= record[j].link %>">
                    <div class="link"><%= record[j].link %> </div>
                    <div class="state fr">
                        <span class="progress"> <%= record[j].state.progress %> </span>
                        <i class="device <%= record[j].state.device %>"></i>
                    </div>
                </li>
                <% } %>

            </div>
        </ul>
        <% } %>

        <div class="read-more">
           查看更多<i class="bi-icon b-icon-arrow-r"></i>
        </div>
    </script>
    <script src="js/template-web.js"></script> -->