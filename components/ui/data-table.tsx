"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Column<TData> {
  key: keyof TData
  header: string
  cell?: (value: any, row: TData) => React.ReactNode
}

interface DataTableProps<TData> {
  columns: Column<TData>[]
  data: TData[]
  pageSize?: number
}

export function DataTable<TData extends Record<string, any>>({
  columns,
  data,
  pageSize = 10,
}: DataTableProps<TData>) {
  const [currentPage, setCurrentPage] = React.useState(0)
  
  const totalPages = Math.ceil(data.length / pageSize)
  const startIndex = currentPage * pageSize
  const endIndex = startIndex + pageSize
  const currentData = data.slice(startIndex, endIndex)

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1))
  }

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
  }

  return (
    <div className="w-full">
      <div className="rounded-md border border-gray-700">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-700">
              {columns.map((column) => (
                <TableHead key={String(column.key)} className="text-gray-300">
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.length > 0 ? (
              currentData.map((row, index) => (
                <TableRow key={index} className="border-gray-700 hover:bg-gray-700/50">
                  {columns.map((column) => (
                    <TableCell key={String(column.key)} className="text-gray-200">
                      {column.cell 
                        ? column.cell(row[column.key], row)
                        : String(row[column.key] || '')
                      }
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="border-gray-700">
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-400"
                >
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-gray-400">
          Página {currentPage + 1} de {totalPages} ({data.length} registros)
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPreviousPage}
            disabled={currentPage === 0}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={goToNextPage}
            disabled={currentPage >= totalPages - 1}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Siguiente
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}