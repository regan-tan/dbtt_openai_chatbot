import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generateResponse = async (messages: { role: 'user' | 'assistant'; content: string }[]) => {
  try {
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