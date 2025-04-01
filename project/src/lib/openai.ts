import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

// Hardcoded responses for specific questions
const HARDCODED_RESPONSES: Record<string, string> = {
  "What new seasonal bakes will I like?": "This spring season, in the month of April-May, you might like something fruity. Try out Elijah's classic favourites such as Wild Berry Lavender & Raspberry Ripple!",
  "I'm feeling something chocolatey and comforting today.": "You might like our Nutella ($54.00), which happens to be one of our all-time favourites! Milo Marshmallow Pie ($59.00) may be comforting too. Go easy on the calories though!",
  "Can I still get a whole pie by tomorrow?": "I've just checked the inventory in real-time. We have stocks available for every pie except for the Matchamisu Pie. Matchamisu Pie will be available only in mid-May!",
  "What flavour should I get today?": "It's been 3 months since you last ordered the Sea Salt Nutella Tart – want one for this weekend?"
};

export const generateResponse = async (messages: { role: 'user' | 'assistant'; content: string }[]) => {
  try {
    // Check if the last user message matches any hardcoded responses
    const lastUserMessage = messages[messages.length - 1];
    if (lastUserMessage.role === 'user' && HARDCODED_RESPONSES[lastUserMessage.content]) {
      return HARDCODED_RESPONSES[lastUserMessage.content];
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are Pie-Bot, a helpful assistant for Elijah Pies bakery. 
          You help customers with orders, provide information about our artisanal pies, 
          and assist with general inquiries. Be friendly and professional.
          
          Key information:
          - We specialize in artisanal pies with over 40 unique flavors
          - Prices range from $28 to $45
          - Two locations: CBD café (123 Market Street) and baking studio (456 Baker's Avenue)
          - We offer workshops at our baking studio
          - Founded in 2014
          - Known for 'IG-worthy' pies
          - Current seasonal favorites: Apple Crumble, Chocolate Pecan, Lemon Meringue`
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating response:', error);
    return "I apologize, but I'm having trouble processing your request right now. Please try again later or contact our staff directly.";
  }
}