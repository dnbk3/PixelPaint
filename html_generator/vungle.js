<script>
	function getMobileOS() {
			var e = navigator.userAgent || navigator.vendor || window.opera;
	return /android|Android/i.test(e) ? "android" : /iPad|iPhone|iPod|Macintosh/.test(e) && !window.MSStream ? "iOS" : "android";		 
   			}
	var clickTag = "https://play.google.com/store/apps/details?id=tms.number.color&gl=us";
	if (getMobileOS()=="iOS"){
		clickTag = "https://play.google.com/store/apps/details?id=tms.number.color&gl=us";
   		}
	window.failedIndex = 0;
	window.openStore = function() {
		parent.postMessage('complete', '*');
	parent.postMessage('download','*');
		}

</script>  