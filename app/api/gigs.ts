import { NextApiRequest, NextApiResponse } from "next";
import { generateGigIdeas, scrapeGigs } from "@/lib/gig-utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const url = req.query.url as string;

    if (!url) {
      res.status(400).json({ error: 'Missing "url" parameter' });
      return;
    }

    try {
      const scrapedGigs = await scrapeGigs(url);
      const gigIdeas = await generateGigIdeas(scrapedGigs);
      res.status(200).json({ gigIdeas });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
