import axios from "axios";
import cheerio from "cheerio";
import { openai } from "../app/openai";
import { Gig } from "../app/types";

const scrapeGigs = async (url: string): Promise<Gig[]> => {
  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);
  const gigs: Gig[] = [];

  // Add your selectors and logic to extract gig data
  $("YOUR_GIG_SELECTOR").each((_idx, el) => {
    const gig: Gig = {
      title: $(el).find("YOUR_TITLE_SELECTOR").text(),
      // Add other gig properties
    };
    gigs.push(gig);
  });

  return gigs;
};

async function generateGigIdeas(scrapedGigs: Gig[]): Promise<string[]> {
  const prompt = `Analyze the following Fiverr gigs and suggest 5 new gig ideas: ${JSON.stringify(
    scrapedGigs
  )}`;

  const response = await openai.Completion.create({
    engine: "text-davinci-002",
    prompt: prompt,
    max_tokens: 150,
    n: 1,
    stop: null,
    temperature: 0.8,
  });

  const ideas = response.choices[0].text.trim().split("\n");
  return ideas;
}

export { generateGigIdeas, scrapeGigs };
