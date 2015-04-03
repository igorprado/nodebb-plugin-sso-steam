<div class="row">
	<div class="col-lg-9">
		<div class="panel panel-default">
			<div class="panel-heading"><i class="fa fa-steam"></i> Steam Social Authentication</div>
			<div class="panel-body">
        <p>
          Get an <strong>API Key</strong> via
          <a href="http://steamcommunity.com/dev/apikey" target="_blank">Steam Web API</a> and then paste
          here. Your callback URL is yourdomain.com/auth/steam/callback
        </p>
				<br />
				<form class="sso-steam">
					<div class="form-group">
						<label for="id">API Key</label>
						<input type="text" name="apiKey" title="Client ID" class="form-control" placeholder="API Key"><br />
					</div>
				</form>
			</div>
		</div>
	</div>
	<div class="col-lg-3">
		<div class="panel panel-default">
			<div class="panel-heading">Steam Control Panel</div>
			<div class="panel-body">
				<button class="btn btn-primary" id="save">Save Settings</button>
			</div>
		</div>
	</div>
</div>

<script>
	require(['settings'], function(Settings) {
		Settings.load('sso-steam', $('.sso-steam'));

		$('#save').on('click', function() {
			Settings.save('sso-steam', $('.sso-steam'), function() {
				app.alert({
					type: 'success',
					alert_id: 'steam-saved',
					title: 'Settings Saved',
					message: 'Please reload your NodeBB to apply these settings',
					clickfn: function() {
						socket.emit('admin.reload');
					}
				});
			});
		});
	});
</script>
