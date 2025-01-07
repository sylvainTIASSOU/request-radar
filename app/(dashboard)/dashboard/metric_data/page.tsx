"use client";
import { Table, DatePicker } from 'antd';
import type { TableColumnsType } from 'antd';
import { TableRowSelection } from "antd/es/table/interface";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import React from "react";
import { Api } from '@/app/api/Api';
import { Input } from '@/components/ui/input';
import LoadingComp from '@/components/LoadingComp';
import { Button } from '@/components/ui/button';
import { CloudUpload } from 'lucide-react';
import { exportToExcel } from '@/lib/utils';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const { RangePicker } = DatePicker;

export type DataType = {
    id: number;
    endpoint: string;
    status_code: number;
    request_size: number;
    response_time: number;
    response_size: number;
    timestamp: string;
    http_method: string;
};

export default function MetricData() {
    const token = Cookies.get('token');
    const router = useRouter();

    const [data, setData] = React.useState<DataType[]>([]);
    const [loading, setLoading] = React.useState(true);

    const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
    const [searchText, setSearchText] = React.useState('');
    const [filteredData, setFilteredData] = React.useState<DataType[]>([]);
    const [timeRange, setTimeRange] = React.useState<[string, string] | null>(null);

    React.useEffect(() => {
        setLoading(true);
        if (!token) return;
        Api.read(`mock/metrics`, token)
            .then((res: any) => {
                if (res.success) {
                    const mappedData = res.data.map((item: any) => ({
                        key: item.id,
                        id: item.id,
                        endpoint: item.endpoint,
                        status_code: item.status_code,
                        request_size: item.request_size,
                        response_time: item.response_time,
                        response_size: item.response_size,
                        timestamp: item.timestamp,
                        http_method: item.http_method,
                    }));
                    setData(mappedData);
                    setFilteredData(mappedData);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.error("Erreur lors de l'appel API :", err);
            })
            .finally(() => setLoading(false));
    }, []);

    const columns: TableColumnsType<DataType> = [
        {
            title: 'EndPoint',
            render: (_, record) => <div className="capitalize">{record.endpoint}</div>,
        },
        {
            title: 'Status Code',
            dataIndex: 'status_code',
            filters: [
                { text: '200', value: 200 },
                { text: '404', value: 404 },
                { text: '500', value: 500 },
            ],
            onFilter: (value, record) => record.status_code === value,
        },
        {
            title: 'HTTP Method',
            dataIndex: 'http_method',
            filters: [
                { text: 'GET', value: 'GET' },
                { text: 'POST', value: 'POST' },
                { text: 'PUT', value: 'PUT' },
                { text: 'DELETE', value: 'DELETE' },
            ],
            onFilter: (value, record) => record.http_method === value,
        },
        {
            title: 'Request Size',
            dataIndex: 'request_size',
        },
        {
            title: 'Response Size',
            dataIndex: 'response_size',
        },
        {
            title: 'Response Time (ms)',
            dataIndex: 'response_time',
        },
        {
            title: 'Timestamp',
            dataIndex: 'timestamp',
            render: (text) => <span>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</span>,
        },
    ];

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const onSearch = (value: string) => {
        setSearchText(value);
        const filtered = data.filter(
            (item) =>
                item.endpoint.toLowerCase().includes(value.toLowerCase()) ||
                item.http_method.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const handleTimeRangeChange = (dates: any, dateStrings: [string, string]) => {
        setTimeRange(dateStrings);
        if (dates) {
            const [start, end] = dateStrings;
            const filtered = data.filter((item) =>
                dayjs(item.timestamp).isBetween(start, end, null, '[]')
            );
            setFilteredData(filtered);
        } else {
            setFilteredData(data);
        }
    };

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <div className="flex flex-1 flex-col gap-7">
            {loading && <LoadingComp />}

            <h1 className="text-4xl font-bold text-colorSecondary">Données des métriques ({data.length})</h1>

            {/* Filters */}
            <div className="w-full flex flex-col gap-4">
                <Input
                    placeholder="Recherche par endpoint ou méthode HTTP"
                    value={searchText}
                    onChange={(e) => onSearch(e.target.value)}
                    className="w-[30rem]"
                />

                <RangePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    onChange={handleTimeRangeChange}
                    className="w-[30rem]"
                />
            </div>

            <Button onClick={() => exportToExcel(filteredData, "metrics")}>
                <CloudUpload />
                Exporter
            </Button>

            <div className="w-full">
                <Table<DataType>
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={filteredData}
                />
            </div>
        </div>
    );
}
