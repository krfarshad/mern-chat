"use client";
import { useState } from "react";
import {
  Autocomplete,
  Chip,
  Avatar,
  AutocompleteItem,
} from "@nextui-org/react";
import { useField, useFormikContext } from "formik";
import { getUsers } from "@/features/users";
import { UserResponse } from "@/utils/models";
import { useDebounce } from "@/hooks/useDebounce";

type UsersMultiSelectProps = {
  name: string;
  isMulti?: boolean;
};

export const UsersMultiSelect = ({
  name,
  isMulti = true,
}: UsersMultiSelectProps) => {
  const [field, , helpers] = useField(name);
  const { setFieldValue } = useFormikContext();
  const [options, setOptions] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>(
    field.value || [],
  );

  const debouncedFetchUsers = useDebounce(async (username: string) => {
    setLoading(true);
    const res = await getUsers({ username });
    setOptions(res.data || []);
    setLoading(false);
  }, 2000);

  const handleSelect = (username: any) => {
    if (!username) {
      return;
    }
    if (isMulti) {
      const updatedUsers = selectedUsers.some((u) => u === username)
        ? selectedUsers.filter((u) => u !== username)
        : [...selectedUsers, username];

      setSelectedUsers(updatedUsers);
      setFieldValue(
        name,
        updatedUsers.map((u) => u),
      );
    } else {
      setSelectedUsers([username]);
      setFieldValue(name, [username]);
    }
  };
  const handleRemove = (username: string) => {
    const updatedUsers = selectedUsers.filter((u) => u != username);
    setSelectedUsers(updatedUsers);
    setFieldValue(
      name,
      updatedUsers.map((u) => username),
    );
  };

  const onChangeHandler = async (value: string) => {
    await debouncedFetchUsers(value);
  };
  return (
    <div>
      <Autocomplete
        onInputChange={(value: string) => onChangeHandler(value)}
        isLoading={loading}
        labelPlacement="inside"
        className="text-light mt-1 w-full rounded-md border border-slate-400 bg-gray-800 pl-1 text-xs placeholder:text-gray-100"
        items={options}
        onSelectionChange={handleSelect}
      >
        {(item) => (
          <AutocompleteItem key={item.username} textValue={item.username}>
            <div className="flex items-center gap-2">
              <Avatar
                alt={item.username}
                className="flex-shrink-0"
                size="sm"
                src={item.avatar}
              />
              <div className="flex flex-col">
                <span className="text-small">{item.username}</span>
                <span className="text-tiny text-default-400">
                  {item.displayName}
                </span>
              </div>
            </div>
          </AutocompleteItem>
        )}
      </Autocomplete>

      {isMulti && selectedUsers.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedUsers.map((user) => (
            <Chip
              key={user}
              className="flex items-center gap-2"
              onClose={() => handleRemove(user)}
            >
              {user}
            </Chip>
          ))}
        </div>
      )}
    </div>
  );
};
