# Form Auto-Refresh Hook

## Overview

The `useFormRefresh` hook provides a standardized way to automatically refresh the page after successful form submissions, ensuring real-time updates are reflected immediately without requiring users to manually refresh or log out and back in.

## Problem Solved

Previously, some updates made on the platform didn't reflect immediately unless users refreshed the page or logged out and logged back in. This affected user experience and real-time responsiveness.

## Usage

### Basic Usage

```tsx
import { useFormRefresh } from "@/hooks/use-form-refresh";

function MyForm() {
  const { handleFormSuccess } = useFormRefresh();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Your form submission logic
      await submitForm(data);

      toast.success("Form submitted successfully!");

      // This will automatically refresh the page after 1 second
      handleFormSuccess(() => {
        // Any cleanup or navigation logic
        setIsOpen(false);
        router.push("/dashboard");
      });
    } catch (error) {
      toast.error("Submission failed");
    }
  };
}
```

### Advanced Usage with Custom Options

```tsx
const { handleFormSuccess, refreshPage } = useFormRefresh({
  shouldRefresh: true, // Whether to refresh (default: true)
  refreshDelay: 2000, // Delay in milliseconds (default: 1000)
  useRouterRefresh: true, // Use router.refresh() vs window.location.reload() (default: true)
});
```

## Options

| Option             | Type      | Default | Description                                                  |
| ------------------ | --------- | ------- | ------------------------------------------------------------ |
| `shouldRefresh`    | `boolean` | `true`  | Whether to refresh the page after successful submission      |
| `refreshDelay`     | `number`  | `1000`  | Delay in milliseconds before refreshing                      |
| `useRouterRefresh` | `boolean` | `true`  | Use `router.refresh()` instead of `window.location.reload()` |

## When to Use Each Refresh Method

### `router.refresh()` (Recommended)

- Use for most cases where you want to refresh server-side data
- Preserves client-side state
- Faster and more efficient
- Good for Next.js applications

### `window.location.reload()`

- Use when you need a complete page reload
- Useful for cases where client-side state needs to be completely reset
- More disruptive but ensures complete refresh

## Implementation Guidelines

### 1. Import the Hook

```tsx
import { useFormRefresh } from "@/hooks/use-form-refresh";
```

### 2. Initialize in Component

```tsx
const { handleFormSuccess } = useFormRefresh({
  shouldRefresh: true,
  refreshDelay: 1000,
  useRouterRefresh: true,
});
```

### 3. Use in Form Submission

```tsx
const handleSubmit = async () => {
  try {
    // Your API call
    await api.submit(data);

    toast.success("Success!");

    // Handle success with auto-refresh
    handleFormSuccess(() => {
      // Cleanup logic
      setFormData({});
      setIsOpen(false);
    });
  } catch (error) {
    toast.error("Failed");
  }
};
```

## Examples by Form Type

### Modal Forms

```tsx
// Edit Profile Modal
const { handleFormSuccess } = useFormRefresh({
  useRouterRefresh: false, // Use window.location.reload() for profile updates
});

handleFormSuccess(() => {
  onSuccess?.();
  onClose();
});
```

### Payment Forms

```tsx
// Payment Modal
const { handleFormSuccess } = useFormRefresh({
  refreshDelay: 2000, // Longer delay for payment processing
});

handleFormSuccess(() => {
  onSuccess(proposalId);
  handleClose();
});
```

### Department/Creation Forms

```tsx
// Department Creation
const { handleFormSuccess } = useFormRefresh({
  refreshDelay: 500, // Quick refresh for simple operations
});

handleFormSuccess();
```

## Best Practices

1. **Always show success toast before refresh** - Users need feedback that their action was successful
2. **Use appropriate delays** - Longer delays for complex operations, shorter for simple ones
3. **Choose the right refresh method** - `router.refresh()` for most cases, `window.location.reload()` when needed
4. **Handle cleanup in the callback** - Reset forms, close modals, navigate as needed
5. **Provide error handling** - Always catch and display errors appropriately

## Migration Guide

### Before

```tsx
// Old pattern
setTimeout(() => {
  window.location.reload();
}, 1000);
```

### After

```tsx
// New pattern
const { handleFormSuccess } = useFormRefresh();
handleFormSuccess(() => {
  // Cleanup logic
});
```

## Components Updated

The following components have been updated to use the new hook:

- ✅ `EditProfileModal` - Profile updates
- ✅ `SectionHeader` - Department creation
- ✅ `MilestoneSubmissionForm` - Milestone submissions
- ✅ `ContactFormDialog` - Contact form submissions
- ✅ `ApprovePayModal` - Payment processing
- ✅ `SendMessageModal` - Message sending
- ✅ `AssignRoleModal` - Role assignments

## Testing

When testing forms with auto-refresh:

1. Submit the form
2. Verify the success toast appears
3. Wait for the refresh delay
4. Confirm the page refreshes and shows updated data
5. Verify no data loss or unexpected behavior

## Troubleshooting

### Page not refreshing

- Check that `shouldRefresh` is `true`
- Verify the delay is appropriate
- Ensure the hook is properly imported and initialized

### Refresh happening too quickly/slowly

- Adjust the `refreshDelay` option
- Consider the complexity of the operation

### State not updating after refresh

- Use `router.refresh()` for server-side data
- Use `window.location.reload()` for complete reset
- Check that the API call is successful before calling `handleFormSuccess`
