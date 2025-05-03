import openai

class Chatbot:
    def __init__(self, api_key):
        self.api_key = api_key
        openai.api_key = self.api_key

    def ask(self, query):
        try:
            response = openai.Completion.create(
                engine="text-davinci-003",
                prompt=query,
                max_tokens=150,
                temperature=0.7
            )
            return response.choices[0].text.strip()
        except Exception as e:
            return f"Error: {e}"

if __name__ == "__main__":
    # Replace 'your_openai_api_key' with your actual OpenAI API key
    api_key = "API-KEY"
    chatbot = Chatbot(api_key)

    print("Chatbot is ready! Type 'exit' to quit.")
    while True:
        user_input = input("You: ")
        if user_input.lower() == "exit":
            print("Goodbye!")
            break
        response = chatbot.ask(user_input)
        print(f"Bot: {response}")