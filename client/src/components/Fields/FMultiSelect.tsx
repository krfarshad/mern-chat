"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Autocomplete,
  Chip,
  Avatar,
  Spinner,
  AutocompleteItem,
} from "@nextui-org/react";
import { useField, useFormikContext } from "formik";
import { getUsers } from "@/features/users";
import { UserResponse } from "@/utils/models";

type UsersMultiSelectProps = {
  name: string;
  isMulti?: boolean;
};

// Custom debounce function
const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: any[]) => {
      if (timer) clearTimeout(timer);
      setTimer(
        setTimeout(() => {
          callback(...args);
        }, delay),
      );
    },
    [callback, delay, timer],
  );
};

export const UsersMultiSelect = ({
  name,
  isMulti = true,
}: UsersMultiSelectProps) => {
  const [field, , helpers] = useField(name);
  const { setFieldValue } = useFormikContext();
  const [options, setOptions] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<UserResponse[]>(
    field.value || [],
  );

  const debouncedFetchUsers = useDebounce(async (username: string) => {
    setLoading(true);
    const res = await getUsers({ username });
    setOptions(res.data || []);
    setLoading(false);
  }, 500);

  useEffect(() => {
    if (query) debouncedFetchUsers(query);
  }, [query]);

  const handleSelect = (user: UserResponse) => {
    if (isMulti) {
      const updatedUsers = selectedUsers.some((u) => u.id === user.id)
        ? selectedUsers.filter((u) => u.id !== user.id)
        : [...selectedUsers, user];

      setSelectedUsers(updatedUsers);
      setFieldValue(
        name,
        updatedUsers.map((u) => u.username),
      );
    } else {
      setSelectedUsers([user]);
      setFieldValue(name, user.username);
    }
  };

  const handleRemove = (userId: number) => {
    const updatedUsers = selectedUsers.filter((u) => u.id !== userId);
    setSelectedUsers(updatedUsers);
    setFieldValue(
      name,
      updatedUsers.map((u) => u.username),
    );
  };

  return (
    <div>
      <Autocomplete
        value={query}
        onInputChange={(value: string) => setQuery(value)}
        isLoading={loading}
        labelPlacement="inside"
        className="max-w-xs"
        items={options}
      >
        {(item) => (
          <>
            {item && (
              <AutocompleteItem key={item.username} textValue={item.username}>
                <div className="flex items-center gap-2">
                  <Avatar src={item.avatar} alt={item.username} size="sm" />
                  <span>{item.username}</span>
                </div>
              </AutocompleteItem>
            )}
          </>
        )}
      </Autocomplete>

      {isMulti && selectedUsers.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedUsers.map((user) => (
            <Chip
              key={user.username}
              className="flex items-center gap-2"
              onClose={() => handleRemove(user.id)}
            >
              <Avatar src={user.avatar} alt={user.username} />
              {user.username}
            </Chip>
          ))}
        </div>
      )}
    </div>
  );
};
