# FAZUR Security Specification

## Data Invariants
1. A Gig can only be created/updated by an Admin.
2. An Order must be linked to a valid Customer and a valid Gig.
3. Only the involved Customer and Admin can read their Conversation and Messages.
4. Ratings can only be given by the Customer who placed the Order, and only after the Order is completed.
5. Users can only read/update their own profile.

## The Dirty Dozen Payloads (Rejection Tests)
1. Creating a Gig as a non-admin.
2. Updating a Gig's `stats` (rating/reviewCount) directly from the client.
3. Creating an Order for another user (spoofing `customerId`).
4. Reading a Conversation that I am not a participant of.
5. Sending a Message as another user.
6. Updating an Order's `price` after it has been created.
7. Deleting a Gig (Admin only, potentially restricted).
8. Creating a Review for an order that isn't mine.
9. Modifying a User's `role` from 'customer' to 'admin'.
10. Creating an Order without a corresponding Gig existing (Relational write check).
11. Sending a Message with a 1MB text string (Denial of Wallet).
12. Updating an Order status to 'completed' as a customer (only Admin should move it forward, then maybe customer completes it or it's automatic).

## Conflict Report

| Collection | Identity Spoofing | State Shortcutting | Resource Poisoning |
|------------|-------------------|-------------------|--------------------|
| users      | Prevent self-admin | N/A               | ID check           |
| gigs       | Admin-only write   | N/A               | Size checks        |
| orders     | customerId match  | Status gates      | Price lock         |
| messages   | senderId match    | N/A               | Text size check    |
| reviews    | customerId match  | Post-order only   | Rating bounds      |
