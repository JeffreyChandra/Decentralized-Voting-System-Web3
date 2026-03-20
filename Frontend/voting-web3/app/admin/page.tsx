"use client";

import { useState } from "react";
import { useWriteContract, useAccount, useReadContract, useWaitForTransactionReceipt } from "wagmi";
import { VOTING_ABI, VOTING_CONTRACT_ADDRESS } from "../../src/constant/contract";
import { ConnectKitButton } from "connectkit";
import Link from "next/link";

export default function AdminPage() {
  const [candidateName, setCandidateName] = useState("");
  const { isConnected, address } = useAccount();

  // 1. Ambil alamat Owner dari Smart Contract untuk validasi UI
  const { data: contractOwner } = useReadContract({
    address: VOTING_CONTRACT_ADDRESS,
    abi: VOTING_ABI,
    functionName: "owner",
  });

  const { data: hash, writeContract, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleAddCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName) return alert("Name cant be empty!");

    writeContract({
      address: VOTING_CONTRACT_ADDRESS,
      abi: VOTING_ABI,
      functionName: "addCandidate",
      args: [candidateName],
    });
  };

  const isOwner = address?.toLowerCase() === (contractOwner as string)?.toLowerCase();

  return (
    <main className="p-8 max-w-2xl mx-auto min-h-screen">
      <div className="mb-8 flex justify-between items-center">
        <Link href="/" className="text-blue-600 hover:underline">← Return To Voting</Link>
        <ConnectKitButton />
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <h1 className="text-2xl font-bold mb-2 text-gray-800">Admin Panel</h1>
        <p className="text-gray-500 mb-6">Add New Candidate.</p>

        {!isConnected ? (
          <div className="p-6 bg-amber-50 text-amber-700 rounded-xl border border-amber-200">
            Please Connect Wallet First.
          </div>
        ) : !isOwner ? (
          <div className="p-6 bg-red-50 text-red-700 rounded-xl border border-red-200">
            Access Denied. Only Owner Can Add Candidate.
          </div>
        ) : (
          <form onSubmit={handleAddCandidate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Candidate Name
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition text-black"
                placeholder="Full Name..."
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                disabled={isPending || isConfirming}
              />
            </div>

            <button
              type="submit"
              disabled={isPending || isConfirming || !candidateName}
              className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-black transition disabled:bg-gray-300 flex justify-center items-center gap-2"
            >
              {isPending || isConfirming ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Processing in Blockchain...
                </>
              ) : "Add Candidate"}
            </button>

            {isSuccess && (
              <div className="p-4 bg-green-100 text-green-700 rounded-xl text-center font-medium">
                 Candidate Successfuly Added
              </div>
            )}
          </form>
        )}
      </div>

      {hash && (
        <div className="mt-6 text-center text-sm text-gray-500">
          Transaction Hash: <span className="font-mono text-xs">{hash}</span>
        </div>
      )}
    </main>
  );
}