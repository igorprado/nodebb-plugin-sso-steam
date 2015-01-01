<h1>Steam OpenID Authentication</h1>
<hr />

<form id="sso-steam-settings">
  <div class="alert alert-warning">
    <p>
      Get an <strong>API Key</strong> via 
      <a href="http://steamcommunity.com/dev/apikey">Steam Web API</a> and then paste
      here.
    </p>
    <br />
    <input type="text" data-key="apiKey" title="API Key" class="form-control input-lg" placeholder="API Key">
  </div>
    <button class="btn btn-lg btn-primary" id="save">Save</button>
</form>

<script type="text/javascript">
    require(['settings'], function(settings) {
    	var wrapper = $('#sso-steam-settings').get(0);
    	settings.sync('sso-steam', wrapper);
    	$('#save').click(function(event) {
    		event.preventDefault();
    		settings.persist('sso-steam', wrapper, function() {
    			socket.emit('admin.settings.sync_sso_steam');
    		});
    	});
    });
</script>
