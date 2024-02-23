export const states = {
	received: 'received',
	found: 'found',
	notFound: 'notFound',
	processed: 'processed',
	pending: 'pending',
	failed: 'failed',
	complete: 'complete'
};

/* 

received: Data received with proper API key

found: integration points found for this integrationID

notFound: 
	No integration points found or
	No integration found

processed: 
	Data processed through Handlebar with injected data
   Note: This is the last stage for "request" since each "output" can have different states

pending: Integration is about to be sent. If it fails, it will stay on this state

failed: It was sent to endpoint but returned with error status

complete: Returned with success status from endpoint

*/