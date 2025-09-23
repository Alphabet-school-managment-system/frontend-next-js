import { Table as MainTable, type TablePaginationConfig } from "antd";
import { useState, type ReactElement } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { Icon } from "@iconify-icon/react";

const Table = ({
  data,
  columns,
  rowKey,
  placeholderText,
  onSearchInputChange,
  onAddButtonClicked,
  addButtonTitle,
  loading,
  showAddButton = true,
  showHeaderBar = true,
  emptyComponent,
  showSearchInput = true,
  FilterOption,
  pagination,
  onRowSelection,
  showRowSelection = false,
  subHeader,
}: {
  data: any[];
  columns: {
    title: string;
    dataIndex: string;
    key: string;
  }[];
  rowKey?: string;
  placeholderText?: string;
  onSearchInputChange?: (value: string) => void;
  onAddButtonClicked?: () => void;
  addButtonTitle?: string;
  loading: boolean;
  showAddButton?: boolean;
  showHeaderBar?: boolean;
  emptyComponent?: any;
  showSearchInput?: boolean;
  FilterOption?: ReactElement;
  pagination?: false | TablePaginationConfig;
  onRowSelection?: (values: React.Key[]) => void;
  showRowSelection?: boolean;
  subHeader?: ReactElement;
}) => {
  const [pageSize, setPageSize] = useState(10);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys);
      onRowSelection && onRowSelection(selectedKeys);
    },
    columnWidth: 75,
  };

  return (
    <>
      <MainTable
        dataSource={data}
        columns={columns}
        rowKey={rowKey}
        loading={loading}
        locale={{
          emptyText: emptyComponent && emptyComponent,
        }}
        title={() =>
          showHeaderBar && (
            <TableHeader
              onSearchInputChange={(value: string) => {
                onSearchInputChange && onSearchInputChange(value);
              }}
              placeholder={placeholderText ? placeholderText : ""}
              onAddButtonClicked={() => {
                onAddButtonClicked && onAddButtonClicked();
              }}
              addButtonTitle={addButtonTitle ? addButtonTitle : ""}
              showAddButton={showAddButton}
              showSearchInput={showSearchInput}
              FilterOption={FilterOption}
              subHeader={subHeader}
            />
          )
        }
        size="small"
        pagination={{
          current: 1,
          pageSize,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100", "1000"],
          itemRender: (_, type) => {
            if (type === "page" || type === "prev" || type === "next") {
              return null;
            }
            return null;
          },
          onChange: (_, pageSize) => {
            setPageSize(pageSize);
          },
          ...pagination,
        }}
        rowSelection={showRowSelection ? rowSelection : undefined}
      />
    </>
  );
};

const TableHeader = ({
  onSearchInputChange,
  placeholder,
  value,
  onAddButtonClicked,
  addButtonTitle,
  showAddButton,
  showSearchInput,
  FilterOption,
  subHeader,
}: {
  onSearchInputChange: (value: string) => void;
  placeholder: string;
  value?: string;
  onAddButtonClicked: () => void;
  addButtonTitle: string;
  showAddButton: boolean;
  showSearchInput: boolean;
  FilterOption?: ReactElement;
  ReactElement?: ReactElement;
  subHeader?: ReactElement;
}) => {
  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.currentTarget.value) {
      onSearchInputChange(event.currentTarget.value);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchInputChange(event.target.value);
  };

  return (
    <div className="flex flex-col justify-between p-4 rounded-lg shadow-main bg-white gap-2">
      <div className="flex justify-between">
        {showSearchInput ? (
          <Input
            placeholder={placeholder}
            prefix={
              <SearchOutlined
                style={{
                  color: "gray",
                  marginRight: 5,
                }}
                width={20}
                height={20}
              />
            }
            className="text-lg"
            size="large"
            onKeyDown={handleEnter}
            allowClear
            onChange={handleChange}
            value={value}
            addonAfter={FilterOption && FilterOption}
          />
        ) : (
          <div></div>
        )}
        {showAddButton && (
          <Button
            className="flex self-center justify-center"
            onClick={() => onAddButtonClicked()}
            style={{ marginLeft: 16 }}
            type="primary"
            icon={
              <span className="flex items-center">
                <Icon icon="gg:add" width={25} height={25} />
              </span>
            }
            size="large"
            shape="default"
            data-testid="add-button"
            data-cy="add-button"
            aria-label="Add new item"
          >
            {addButtonTitle}
          </Button>
        )}
      </div>
      {subHeader && subHeader}
    </div>
  );
};

export default Table;
