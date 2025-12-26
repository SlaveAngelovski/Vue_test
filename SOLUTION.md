# Solution Write-Up

## Candidate Information

- **Name:** Slave Angelovski
- **Date:** 26.12.2025
- **Time Spent:** 3 hours 15 minutes

---

## Completed Tasks

Check the tasks you completed:

### Part 1: Basic Tasks
- [x] Task 1: Reorder Components (basket below products)
- [x] Task 2: Empty State message
- [x] Task 3: Red total price when > 50
- [x] Task 4: Remove button for basket items

### Part 2: Intermediate Tasks
- [x] Task 5: Quantity Controls (+/- buttons)
- [ ] Task 6: Persist Basket (localStorage)
- [ ] Task 7: Visual Redesign (styling/CSS)

### Part 3: Advanced Tasks
- [x] Task 8: API Integration (Fake Store API)
- [ ] Task 9: Unit Testing (Vitest)

---

## Design Decisions

> Explain any significant design choices you made. For example:
> - Why did you structure your components a certain way?
* I used emit on the `BasketSmall.vue` when a product is removed so the `FrontPage.vue` will keep the data handling logic and the `BasketSmall.vue` will just handle the product display.

* Tried to use as much as possible of the intergrated functionality on the `PrimeVue` components.

> - How did you handle edge cases?
I handled :
   * The empty basket state on the `addProduct` function with checks and by disabling the decrement button on the ui if the product is not present.
   * The api handles failures by throwing an error and showing a message with a retry button.
   * Handled image loading errors with fallback placeholders.
   
> - What trade-offs did you consider?
* Chose only one task from the second part due to the time constraint.

* API structure: I chose to keep products as an array instead of converting it to an object, I didnt have the time.

* Component communication: Chose to emit events (proper Vue pattern) vs direct prop mutation

* Error handling: I chose to show error states with retry (more code, better UX) vs simple error logging (less code, worse UX)

* Used computed styling `totalPriceStyling` on the `BasketSmall.vue` to avoid unnecessary re-renders.

---

## Challenges Encountered

> Describe any challenges you faced and how you solved them.

I had not encountered any challenges.

There was a bug on the `BasketSmall.vue` on how it was selecting the products, by an array index instead of the product id, when I used the real api this was apparent, so I had to fix that and use the product id instead.

The disabled button state on the decrement wasnt updating with my initial solution, so I had to fix that as well.

---

## What I Would Improve

> If you had more time, what would you do differently or add?

I would add:
* Add `lang=ts` to the vue files with corresponding types.
* Use aliases when importing.
* Add tests, I didnt have the time, it was going to take me more than 3 hours.
* Better api error handling.
* Style the components a bit more with tailwind.
* Add a modal to ask for confirmation before removing a product from the basket.
* Add pagination
* Optimise the image size / loading, so they are not loaded twice.
* Convert the product from an array to an object, to avoid array searches.
---

## Additional Notes

> Any other information you'd like to share about your solution.

N/A


