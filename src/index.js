export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(handleScheduledEvent(env));
  },
};

async function handleScheduledEvent(env) {
  const { GITHUB_TOKEN, GITHUB_USER, GITHUB_REPO, WORKFLOW_ID = 'main.yml' } = env;

  const url = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/actions/workflows/${WORKFLOW_ID}/dispatches`;

  try {
    const dispatchResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Cloudflare-Worker-Trigger',
      },
      body: JSON.stringify({
        ref: 'main'
      }),
    });

    if (!dispatchResponse.ok) {
      const errorText = await dispatchResponse.text();
      throw new Error(`Status: ${dispatchResponse.status} - ${errorText}`);
    }
    console.log('Successfully dispatched GitHub Action');
  } catch (error) {
    console.error('Error handling scheduled event:', error);
  }
}
