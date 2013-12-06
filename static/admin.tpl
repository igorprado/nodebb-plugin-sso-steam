<h1>Steam OpenID Authentication</h1>
<hr />

<form>
  <div class="alert alert-warning">
    <p>
      Get an <strong>API Key</strong> via 
      <a href="http://steamcommunity.com/dev/apikey">Steam Web API</a> and then paste
      here.
    </p>
    <br />
    <input type="text" data-field="social:steam:apikey" title="API Key" class="form-control input-lg" placeholder="API Key">
  </div>
</form>

<button class="btn btn-lg btn-primary" id="save">Save</button>

<script>
  require(['forum/admin/settings'], function(Settings) {
    Settings.prepare();
  });
</script>