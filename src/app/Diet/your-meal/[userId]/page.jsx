"use client";
import Markdown from "@/components/ui/markdownrenderer";
import React, { useState, useEffect } from "react";
import getPage from "@/utils/getPageByUserId";
import Loading from "@/app/loading";
// let content = `
// # Mediterranean Quinoa Salad

// ![Mediterranean Quinoa Salad](https://via.placeholder.com/600x400.png?text=Mediterranean+Quinoa+Salad)

// This vibrant and nutritious Mediterranean Quinoa Salad is perfect for a light lunch or as a side dish. Packed with protein, fiber, and fresh vegetables, it's both delicious and healthy!

// ## Ingredients

// ### For the Salad:
// - 1 cup quinoa, rinsed
// - 2 cups water
// - 1 cucumber, diced
// - 1 pint cherry tomatoes, halved
// - 1 red bell pepper, diced
// - 1/2 red onion, finely chopped
// - 1/2 cup kalamata olives, pitted and halved
// - 1/2 cup feta cheese, crumbled
// - 1/4 cup fresh parsley, chopped
// - 1/4 cup fresh mint, chopped

// ### For the Dressing:
// - 1/4 cup extra virgin olive oil
// - 2 tablespoons lemon juice
// - 1 clove garlic, minced
// - 1 teaspoon dried oregano
// - Salt and freshly ground black pepper to taste

// ## Instructions

// 1. **Cook the Quinoa:**
//    - In a medium saucepan, combine quinoa and water.
//    - Bring to a boil, then reduce heat to low, cover, and simmer for about 15 minutes, or until water is absorbed.
//    - Remove from heat and let stand, covered, for 5 minutes.
//    - Fluff with a fork and let cool to room temperature.

// 2. **Prepare the Vegetables:**
//    - While the quinoa is cooking, chop all the vegetables as specified in the ingredients list.

// 3. **Make the Dressing:**
//    - In a small bowl, whisk together olive oil, lemon juice, minced garlic, oregano, salt, and pepper.

// 4. **Assemble the Salad:**
//    - In a large bowl, combine the cooled quinoa, cucumber, tomatoes, bell pepper, red onion, olives, feta cheese, parsley, and mint.
//    - Pour the dressing over the salad and toss gently to combine.

// 5. **Serve:**
//    - Taste and adjust seasoning if needed.
//    - Serve immediately or chill in the refrigerator for an hour to allow flavors to meld.

// > **Chef's Tip:** For a vegan version, simply omit the feta cheese or replace it with a plant-based alternative.

// ## Variations

// You can customize this salad to your liking. Here are some ideas:

// - Add grilled chicken or shrimp for extra protein
// - Throw in some chickpeas for additional fiber
// - Swap quinoa for couscous or bulgur wheat
// - Add some diced avocado for creaminess

// Enjoy your homemade Mediterranean Quinoa Salad! It's a perfect make-ahead Page for busy weekdays or a crowd-pleasing dish for potlucks and picnics.

// ---

// *This recipe is part of our "Healthy Eating" series. Check out more recipes on our website!*

// `;

function Page({ params }) {
  let [content, setContent] = useState("");
  useEffect(() => {
    getPage(params.userId).then((data) => {
      console.log(data);
      setContent(data);
    });
  }, [params.userId]);
  if (!content)
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  return (
    <div>
      <Markdown markdownText={content.data}></Markdown>
    </div>
  );
}

export default Page;
