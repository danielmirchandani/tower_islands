if [ -z $1 ]; then
	echo "Must specify a Google Cloud Storage bucket name to deploy static files to"
	exit -1
fi
bucket="gs://$1"
echo "Deploying static files to $bucket"
gsutil cp static/* $bucket
gcloud functions deploy buildTower --source=buildTower --runtime=nodejs6 --trigger-http
gcloud functions deploy movePiece --source=movePiece --runtime=nodejs6 --trigger-http
